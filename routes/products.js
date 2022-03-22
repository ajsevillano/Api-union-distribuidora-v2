import express from 'express';
const router = express.Router();
import { getAllProducts, getProductByID } from '../models/products.js';
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

export default router;
