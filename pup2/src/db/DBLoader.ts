import pg from 'pg';

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

console.log(`DBLoader`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToDbConfig = path.join(__dirname, '../dbConfig.json');
const clientConfig = JSON.parse(await fs.readFile(pathToDbConfig, 'utf8'));

const { Client } = pg;

export default async function fetchJsonFileFromDb(
  fileName: string
): Promise<Object> {
  const client = new Client(clientConfig);
  await client.connect();
  const queryText =
    'SELECT text_lines_json FROM spanish_stories WHERE file_name_noext = $1';
  try {
    console.log(`trying to query with fileName=${fileName}\n`);
    const res = await client.query(queryText, [fileName]);
    await client.end();
    if (res.rows.length > 0) {
      let jsonOutput = res.rows[0].text_lines_json;
      console.log(`jsonOutput=${jsonOutput}`);
      return jsonOutput;
    }
  } catch (e) {
    console.log(e);
  }
  await client.end();
  return { lines: [] };
}

export async function saveJsonTranslationToDb(
  translationObject: Object,
  fileName: string
) {
  const client = new Client(clientConfig);
  await client.connect();
  const queryText =
    'UPDATE spanish_stories SET translations_json=$1 WHERE file_name_noext=$2';
  try {
    await client.query(queryText, [
      JSON.stringify(translationObject),
      fileName,
    ]);
  } catch (e) {
    console.log(e);
  }
  await client.end();
}
