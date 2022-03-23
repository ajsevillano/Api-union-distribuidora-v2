import query from '../db/index.js';
import { errorMsgs } from '../data/errorMsg.js';

// GET ALL PRODUCTS
export async function getAllProducts() {
  const data = await query(`SELECT * FROM  products;`);
  return responseHandler(true, data.rows);
}

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

// CREATE A NEW PRODUCT
export async function createUser(newUser) {
  //Check if the body is empty
  const CheckbodyIsEmpty = checkBodyObjIsEmpty(newUser);
  if (CheckbodyIsEmpty) {
    return responseHandler(false, ErrorMsg('errorMsgNoBody'));
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

const responseHandler = (status, statusMsg) => {
  return {
    success: status,
    payload: statusMsg,
  };
};

const ErrorMsg = (errorMsg) => {
  const filterError = errorMsgs.find((error) => error.name === errorMsg);
  return filterError.response;
};

const checkBodyObjIsEmpty = (body) => {
  return Object.keys(body).length === 0 ? true : false;
};

const checkIfItemExist = (data, id) => {
  return !data.rowCount
    ? responseHandler(false, notFound(id))
    : responseHandler(true, data.rows);
};

//ERROR MSG
const notFound = (id) => {
  return {
    code: 404,
    status: 'Not found',
    message: `We couldn't find the product with the id ${id}`,
  };
};
