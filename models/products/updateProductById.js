import query from '../../db/index.js';
import {
  responseHandler,
  ErrorMsg,
  checkBodyObjIsEmpty,
} from '../../libs/products.js';

export async function updateProductByID(id, updatedBody) {
  //Check for an empty body
  if (checkBodyObjIsEmpty(updatedBody)) {
    return responseHandler(false, ErrorMsg('errorMsgNoBody'));
  }

  let userId = Number(id);
  const { name, brand, category, size, active, favorite } = updatedBody;
  const timestamp = 'now()';
  const sqlQuery = `UPDATE products SET name=$1,brand=$2,category=$3,size=$4,active=$5,favorite=$6,timestamp=$7 WHERE id=$8  RETURNING *;`;
  const data = await query(sqlQuery, [
    name,
    brand,
    category,
    size,
    active,
    favorite,
    timestamp,
    userId,
  ]);
  return responseHandler(true, data.rows);
}
