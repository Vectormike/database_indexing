const app = require('express')();
const { Pool } = require('pg');
const fs = require('fs');
let createTable = fs.readFileSync('./database/create.sql').toString();
let createIndexTable = fs.readFileSync('./database/index.sql').toString();

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'indexing',
  password: null,
});

app.get('/', async (req, res) => {
  try {
    const create = await pool.query(createTable);
    const createIndex = await pool.query(createIndexTable);
    console.log(createIndexTable);
    return res.send({ create, createIndex });
  } catch (error) {
    return res.send({ error, message: 'Caught error' });
  }
});

const port = 5000 | process.env.port;
app.listen(port, () => console.log('\x1b[36m%s\x1b[0m', `Server on port ${port}`));
