import query from '../../db/index.js';
import {
  checkBodyObjIsEmpty,
  ErrorMsg,
  responseHandler,
} from '../../libs/products.js';

export async function createNewProduct(newProduct) {
  const { name, brand, category, size, active, favorite } = newProduct;
  const timestamp = 'now()';

  if (checkBodyObjIsEmpty(newProduct)) {
    return responseHandler(false, ErrorMsg('errorMsgNoBody'));
  }

  const sqlString = `INSERT into products (name,brand,category,size,active,favorite,timestamp) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;
  const data = await query(sqlString, [
    name,
    brand,
    category,
    size,
    active,
    favorite,
    timestamp,
  ]);
  return responseHandler(true, data.rows);
}
