import { errorMsgs } from '../data/errorMsg.js';

export const responseHandler = (status, statusMsg) => {
  return {
    success: status,
    payload: statusMsg,
  };
};

export const ErrorMsg = (errorMsg) => {
  const filterError = errorMsgs.find((error) => error.name === errorMsg);
  return filterError.response;
};

export const checkBodyObjIsEmpty = (body) => {
  return Object.keys(body).length === 0 ? true : false;
};

export const checkIfItemExist = (data, id) => {
  console.log(data.rowCount);
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
