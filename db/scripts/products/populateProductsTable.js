import query from '../../index.js';
import { products } from '../../data/products.js';

async function populateProductsTable() {
  for (let index = 0; index < products.length; index++) {
    const { name, brand, category, size, active, favorite } = products[index];

    //Current time when data is added.
    const timestamp = 'now()';

    //SQL to populate the table.
    const sqlString = `INSERT into products (name,brand,category,size,active,favorite,timestamp) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
    const response = await query(sqlString, [
      name,
      brand,
      category,
      size,
      active,
      favorite,
      timestamp,
    ]);
    console.log(response);
  }
}

populateProductsTable();
