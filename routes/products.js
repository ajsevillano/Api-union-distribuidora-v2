import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductByID,
  createUser,
} from '../models/products.js';
import { requiredScopes } from 'express-oauth2-jwt-bearer';

// GET ALL PRODUCTS
router.get(`/`, requiredScopes('read:products'), async function (req, res) {
  const result = await getAllProducts();
  res.json(result);
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

//ADD A NEW PRODUCT
router.post(`/`, requiredScopes('read:products'), async function (req, res) {
  //Get the body from the params
  const postBody = req.body;
  //Call the function to add the new user
  const newUser = await createUser(postBody);
  //Return the response
  res.json(newUser);
});

export default router;
