// GET ALL USERS
import query from '../db/index.js';

export async function getAllProducts() {
  //Return all the products
  const data = await query(`SELECT * FROM  products;`);
  return responseHandler(true, data.rows);
}

export async function getProductByID(id) {
  const sqlString = `SELECT * FROM  products WHERE id=$1`;
  const data = await query(sqlString, [id]);
  return responseHandler(true, data.rows);
}

//RESPONSE HANDLER
function responseHandler(status, statusMsg) {
  return {
    success: status,
    payload: statusMsg,
  };
}
