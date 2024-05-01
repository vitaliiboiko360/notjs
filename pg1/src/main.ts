
import pg from 'pg';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rl = readline.createInterface({ input, output });

const { Client } = pg;

const clientConfig = {
  host: "192.168.1.3",
  port: 5432,
  user: "learntospeak",
  database: "learntospeak",
  password: "5b553db13b5157677f76394ace066fbe",
  ssl: false,
  application_name: "db client",
  keepAlive: true,
};

const client = new Client(clientConfig);
await client.connect();

async function loadJsonFileToDb(fileName: string, dbClient: pg.Client) {
  const data = await fs.readFile(fileName);
  const justFileName = path.basename(fileName, path.extname(fileName));
  try {
    console.log('BEGIN');
    await dbClient.query('BEGIN')
    const queryText = 'INSERT INTO spanish_stories(text_lines_json) VALUES($1) RETURNING id'
    const res = await dbClient.query(queryText, [data]);
    if (res.rows.length > 0) {
      const id = res.rows[0].id;
      console.log(`UPDATE WHERE id=${id}`);

      const queryText2 = 'UPDATE spanish_stories SET file_name_noext=$1 WHERE id=$2';

      await dbClient.query(queryText2, [justFileName, id])
    }
    await dbClient.query('COMMIT');
  } catch (e) {
    console.log(e);
    console.log('ROLLBACK');
    await dbClient.query('ROLLBACK')
  }
}

const endClientAndProcess = async (client: pg.Client) => {
  await client.end();
  process.exit();
};

if (process.argv.length > 2) {
  const shouldBeFilePath = process.argv[2];
  console.log(`have supplied second argument\nshould be path ${shouldBeFilePath}\n`);
  const answer = await rl.question('to execute query enter - y\n');
  if (answer == 'y')
    loadJsonFileToDb(shouldBeFilePath, client);
}

while (true) {
  const answer: string = await rl.question('q - quit,\nl - load data to db\n');
  if (answer.length > 1) {
    try {
      console.log(`you've entered query:\n${answer}\n`);
      const answer2: string = await rl.question('to execute query enter - y\n');
      if (answer2 == 'y') {
        const res = await client.query(answer);
        console.log(res);
      }
    } catch {
      console.log('error');
    }
    continue;
  }
  if (answer == 'q') {
    endClientAndProcess(client);
  }
}
