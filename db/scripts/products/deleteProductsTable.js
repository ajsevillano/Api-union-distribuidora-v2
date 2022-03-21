import query from '../../index.js';
const sqlString = `DROP TABLE products;`;

async function deleteProductsTable() {
  const res = await query(sqlString);
  console.log('table users deleted', res);
}

deleteProductsTable();
