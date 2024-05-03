import pg from 'pg';

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
