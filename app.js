//Express helpers
import express from 'express';
import path from 'path';
import __dirname from './dirname.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';

//Import routes
import productsRouter from './routes/products.js';

//Auth library
import { auth } from 'express-oauth2-jwt-bearer';

const app = express();

//Invoke the middleware for auth.
const checkJwt = auth({
  issuerBaseURL: process.env.ISSUERBASEURL,
  audience: process.env.AUDIENCE,
});

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/products', checkJwt, productsRouter);

//Error handlers

//Not found error (404)
app.use(function (req, res) {
  res.status(404).json({
    error: {
      code: 404,
      status: 'Not found',
      message: `We couldn't find what you were looking for`,
    },
  });
});

//Unauthorized error (401)
app.use(function (error, req, res, next) {
  res.status(401).json({
    error: {
      code: 401,
      status: 'Access denied (Unauthorized)',
      message: 'Error validating access token',
    },
  });
});

export default app;
