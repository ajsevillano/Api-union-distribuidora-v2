// GET ALL USERS
import query from '../db/index.js';

export async function getAllProducts() {
  //Return all the products
  const data = await query(`SELECT * FROM  products;`);
  return responseHandler(true, data.rows);
}

export async function getMeals() {
  const data = await query(`SELECT * FROM  products WHERE category='meals';`);
  return responseHandler(true, data.rows);
}

export async function getDrinks() {
  const data = await query(`SELECT * FROM  products WHERE category='drinks';`);
  return responseHandler(true, data.rows);
}

//RESPONSE HANDLER
function responseHandler(status, statusMsg) {
  return {
    success: status,
    payload: statusMsg,
  };
}
