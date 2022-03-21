import express from 'express';
const router = express.Router();
import { getAllProducts, getMeals, getDrinks } from '../models/products.js';
import { requiredScopes } from 'express-oauth2-jwt-bearer';

// GET ALL USERS
// User need read:products scope to see the info
router.get(`/`, requiredScopes('read:products'), async function (req, res) {
  const result = await getAllProducts();
  res.json(result);
});

router.get(`/meals`, async function (req, res) {
  const result = await getMeals();
  res.json(result);
});

router.get(`/drinks`, async function (req, res) {
  const result = await getDrinks();
  res.json(result);
});

export default router;
