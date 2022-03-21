import query from '../../index.js';

const userQuery = `CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  name TEXT,
  brand TEXT,
  category TEXT,
  size TEXT,
  active BOOLEAN NOT NULL,
  favorite BOOLEAN NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now()
  )`;

async function createProductsTable() {
  const response = await query(userQuery);
  console.log(response);
}

createProductsTable();
