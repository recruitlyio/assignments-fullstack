import express from 'express';
import { genrateData } from './genrateController.js';

const genrateRoute= express.Router();


genrateRoute.post("/generate",genrateData)

export default genrateRoute;