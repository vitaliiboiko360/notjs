
import pg from 'pg';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'url';

const rl = readline.createInterface({ input, output });

const { Client } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToDbConfig = path.join(__dirname, '../dbConfig.json');
const clientConfig = JSON.parse(await fs.readFile(pathToDbConfig, 'utf8'));

const client = new Client(clientConfig);
await client.connect();

async function loadJsonFileToDb(fileName: string, dbClient: pg.Client) {
  const data = await fs.readFile(fileName);
  const justFileName = path.basename(fileName, path.extname(fileName));
  try {
    console.log('BEGIN');
    await dbClient.query('BEGIN');
    const queryText = 'INSERT INTO spanish_stories(text_lines_json) VALUES($1) RETURNING id';
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

const listOfFilesJson: { texts: [{ resource: string }] } = JSON.parse(await fs.readFile('../../lang-learner/data/list_of_texts.json', 'utf8'));
const listOfFileNames = listOfFilesJson.texts.map(el => el.resource);
console.log(`list of files:\n\n${listOfFileNames.join('\n')}\n\n`);
let index = 0;
while (true) {
  let fileName = listOfFileNames[index % listOfFileNames.length];

  let filePath = path.join('$HOME/ndwdir/lang-learner/data/', fileName + '.json');

  const answer: string = await rl.question(`press y to load file ${filePath}\n`);
  if (answer == 'y') {
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
