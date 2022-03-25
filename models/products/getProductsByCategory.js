import query from '../../db/index.js';
import { categories } from '../../data/categories.js';
import { getAllProducts } from './getAllProducts.js';
import { responseHandler, ErrorMsg } from '../../libs/products.js';

export async function getProductsByCategory(queryString, queryStringLength) {
  //Only 1 filter is allowed
  if (queryStringLength > 1) {
    return responseHandler(false, ErrorMsg('tooManyFilters'));
  }

  //The filter must be category
  if (!queryString.hasOwnProperty('category')) {
    return responseHandler(false, ErrorMsg('errorInvalidFilter'));
  }

  //The filter can't be empty
  if (!Object.values(queryString)[0]) {
    return responseHandler(false, ErrorMsg('queryCantBeEmpty'));
  }

  //The filter value must be one of the valid values
  if (!categories.includes(Object.values(queryString)[0])) {
    return responseHandler(false, ErrorMsg('notaValidValue'));
  }

  //Return all the items if the category is all
  if (Object.values(queryString)[0] === 'all') {
    return getAllProducts();
  }

  //Return the filter
  const queryFilter = queryString.category;
  const sqlString = `SELECT * FROM  products WHERE category=$1;`;
  const data = await query(sqlString, [queryFilter]);
  return responseHandler(true, data.rows);
}
