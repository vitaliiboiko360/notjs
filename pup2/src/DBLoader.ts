import pg from 'pg';

import fs from 'node:fs/promises';
import path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToDbConfig = path.join(__dirname, '../dbConfig.json');
const clientConfig = JSON.parse(await fs.readFile(pathToDbConfig, 'utf8'));

const { Client } = pg;
const client = new Client(clientConfig);

export default async function loadJsonFileToDb(data: string, dbClient: pg.Client) {
  await client.connect();

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
