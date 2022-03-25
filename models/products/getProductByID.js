import query from '../../db/index.js';
import {
  responseHandler,
  checkIfItemExist,
  ErrorMsg,
} from '../../libs/products.js';

// GET PRODUCT BY ID
export async function getProductByID(id) {
  const numericId = Number(id);
  //If the converted id is not a valid integer:
  if (Number.isNaN(numericId)) {
    return responseHandler(false, ErrorMsg('notValidId'));
  }
  //If the id is not between the 0 & max integer value:
  if (numericId < 0 || numericId > 2147483647) {
    return responseHandler(false, ErrorMsg('notValidRange'));
  }
  //Return DB response
  const sqlString = `SELECT * FROM  products WHERE id=$1`;
  const data = await query(sqlString, [id]);
  return checkIfItemExist(data, id);
}
