import query from '../db/index.js';
import {
  responseHandler,
  ErrorMsg,
  checkBodyObjIsEmpty,
} from '../libs/products.js';

// GET ALL PRODUCTS
export async function getAllProducts() {
  const data = await query(`SELECT * FROM  products ORDER by id;`);
  return responseHandler(true, data.rows);
}

// CREATE A NEW PRODUCT
export async function createProduct(newProduct) {
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

//UPDATE A PRODUCT
export async function updateProductByID(id, updatedBody) {
  //If the object sent as body is empty, we return an error message
  if (checkBodyObjIsEmpty(updatedBody)) {
    return responseHandler(false, ErrorMsg('errorMsgNoBody'));
  }

  //Convert the string id to a number
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
