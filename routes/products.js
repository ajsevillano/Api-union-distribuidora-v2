import express from 'express';
const router = express.Router();
import { getAllProducts, createProduct } from '../models/products.js';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import { getProductsByCategory } from '../models/products/getProductsByCategory.js';
import { getProductByID } from '../models/products/getProductByID.js';
import { updateProductByID } from '../models/products/updateProductById.js';

// GET ALL PRODUCTS & PRODUCTS FILTER BY CATEGORY
router.get(`/`, requiredScopes('read:products'), async function (req, res) {
  const queryStringLength = Object.keys(req.query).length;
  if (!queryStringLength) {
    const result = await getAllProducts();
    return res.json(result);
  }
  const result = await getProductsByCategory(req.query, queryStringLength);
  return res.json(result);
});

// GET PRODUCT BY ID
router.get(`/:id`, requiredScopes('read:products'), async function (req, res) {
  //Get the id from the params
  const id = req.params.id;
  //Call the function to get the user by Id
  const resultbyId = await getProductByID(id);
  //Return the response
  res.json(resultbyId);
});

// ADD A NEW PRODUCT
router.post(`/`, requiredScopes('create:products'), async function (req, res) {
  //Get the body from the params
  const postBody = req.body;
  //Call the function to add the new user
  const newProduct = await createProduct(postBody);
  //Return the response
  res.json(newProduct);
});

// UPDATE A PRODUCT
router.put(
  '/:id',
  requiredScopes('update:products'),
  async function (req, res) {
    //Get the body from the params
    const body = req.body;
    //Get the id
    const id = req.params.id;
    //Call the function to add the new user
    const updateUser = await updateProductByID(id, body);
    //Return the response
    res.json(updateUser);
  }
);

export default router;
