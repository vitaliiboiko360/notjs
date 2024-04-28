
import pg from 'pg';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

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

const client = new Client(clientConfig)
await client.connect()

while (true) {
  const answer: string = await rl.question('r - run, q - quit');
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
}
