
import pg from 'pg';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';

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

const inputJsonFilePath = '/home/user1/ndwdir/lang-learner/data/me_gusta_leer.json';

async function loadJsonFileToDb(fileName: string, dbClient: pg.Client) {
  const data = await fs.readFile(inputJsonFilePath);
  const justFileName = path.basename(inputJsonFilePath, path.extname(inputJsonFilePath));
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

while (true) {
  const answer: string = await rl.question('r - run,\nq - quit,\nl - load data to db\n');
  if (answer == 'r') {
    try {
      const res = await client.query('SELECT NOW()');
      console.log(res);
    } catch {
      console.log('error');
    }
    continue;
  }
  if (answer == 'q') {
    await client.end();
    process.exit();
  }
  if (answer == 'l') {
    loadJsonFileToDb(inputJsonFilePath, client);
  }
}
