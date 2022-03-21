import query from '../../index.js';

const truncateQuery = `TRUNCATE TABLE products RESTART IDENTITY`;

async function emptyProductsTable() {
  const res = await query(truncateQuery);
  console.log(res);
}

emptyProductsTable();
