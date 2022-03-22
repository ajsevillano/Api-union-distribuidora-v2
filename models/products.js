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

// CREATE A USER
export async function createUser(newUser) {
  //Check if the body is empty
  const CheckbodyIsEmpty = checkBodyObjIsEmpty(newUser);
  if (CheckbodyIsEmpty) {
    return responseHandler(false, errorMsgNoBody);
  }
  //Else
  //Destructuring the body
  const { name, brand, category, size, active, favorite } = newUser;
  //Get the time
  const timestamp = 'now()';
  //Add the new user to the data
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

//RESPONSE HANDLER
function responseHandler(status, statusMsg) {
  return {
    success: status,
    payload: statusMsg,
  };
}

function checkBodyObjIsEmpty(body) {
  //Check if the body  sent in the request is empty
  return Object.keys(body).length === 0 ? true : false;
}

const errorMsgNoBody = `The body can't be empty. An object with the fields: needs to be send as body`;
