import query from '../../index.js';
import { products } from '../../mockdata/mockdata-products.js';

async function populateProductsTable() {
  for (let index = 0; index < products.length; index++) {
    const { name, description, category, price, img } = products[index];

    //Current time when data is added.
    const timestamp = 'now()';

    //SQL to populate the table.
    const sqlString = `INSERT into products (name,description,category,price,img,timestamp) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
    const response = await query(sqlString, [
      name,
      description,
      category,
      price,
      img,
      timestamp,
    ]);
    console.log(response);
  }
}

populateProductsTable();
