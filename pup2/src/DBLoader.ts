import pg from 'pg';

import fs from 'node:fs/promises';
import path from 'node:path'
import { fileURLToPath } from 'url';

console.log(`DBLoader`);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathToDbConfig = path.join(__dirname, '../dbConfig.json');
const clientConfig = JSON.parse(await fs.readFile(pathToDbConfig, 'utf8'));

const { Client } = pg;
const client = new Client(clientConfig);

export default async function loadJsonFileFromDb(fileName: string): Promise<Object> {
  await client.connect();
  const queryText = 'SELECT spanish_stories(text_lines_json) WHERE file_name_noext == $1';
  try {
    console.log(`trying to query with fileName=${fileName}\n`);
    const res = await client.query(queryText, [fileName]);
    await client.end();
    if (res.rows.length > 0) {
      const jsonOutput = res.rows[0].text_lines_json;
      console.log(`jsonOutput=${jsonOutput}`);
      return jsonOutput;
    }
  } catch (e) {
    console.log(e);
  }
  await client.end();
  return {};
}
