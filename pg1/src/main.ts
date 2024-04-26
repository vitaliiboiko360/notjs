
import pg from 'pg';

const { Client } = pg;

const clientConfig = {
  host: "192.168.1.3",
  port: 5334,
  user: "learntospeak",
  database: "learntospeak",
  password: "5b553db13b5157677f76394ace066fbe",
  application_name: "db client",
  keepAlive: true,
};


const client = new Client(clientConfig)
await client.connect()

const res = await client.query('SELECT NOW()');
console.log(res);

await client.end();
