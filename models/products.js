import query from '../db/index.js';

// GET ALL PRODUCTS
export async function getAllProducts() {
  //Return all the products
  const data = await query(`SELECT * FROM  products;`);
  return responseHandler(true, data.rows);
}

// GET PRODUCT BY ID
export async function getProductByID(id) {
  //Convert the id into a Number
  const numericId = Number(id);
  //Check if the converted ID is diferent to an integer
  if (Number.isNaN(numericId)) {
    return responseHandler(false, notValidId);
  } else {
    const sqlString = `SELECT * FROM  products WHERE id=$1`;
    const data = await query(sqlString, [id]);
    return checkIfItemExist(data, id);
  }
}

// CREATE A NEW PRODUCT
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

function checkIfItemExist(data, id) {
  return !data.rowCount
    ? responseHandler(false, notFound(id))
    : responseHandler(true, data.rows);
}

//ERROR MSG
const notFound = (id) => {
  return {
    code: 404,
    status: 'Not found',
    message: `We couldn't find the product with the id ${id}`,
  };
};
const notValidId = {
  code: 400,
  status: 'Not a valid ID',
  message: 'The product id must be a valid number',
};
const errorMsgNoBody = {
  code: 400,
  status: `The body can't be empty`,
  message: `An object with the fields: needs to be send as body`,
};

//ERROR MSGS ARRAY
const errorMsgs = [
  {
    name: 'notValidId',
    response: {
      code: 400,
      status: 'Not a valid ID',
      message: 'The product id must be a valid number',
    },
  },
];
