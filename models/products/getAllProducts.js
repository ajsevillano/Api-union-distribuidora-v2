import query from '../../db/index.js';
import { responseHandler } from '../../libs/products.js';

// GET ALL PRODUCTS
export async function getAllProducts() {
  const data = await query(`SELECT * FROM  products ORDER by id;`);
  return responseHandler(true, data.rows);
}
