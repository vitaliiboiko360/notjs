import pg from 'pg';

const clientConfig = {
  host: "192.168.1.3",
  port: 5432,
  user: "",
  database: "learntospeak",
  password: "5b553db13b5157677f76394ace066fbe",
  ssl: false,
  application_name: "db client",
  keepAlive: true,
};

const { Client } = pg;

const client = new Client(clientConfig);
await client.connect();

export default async function loadJsonFileToDb(fileName: string, dbClient: pg.Client) {
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
