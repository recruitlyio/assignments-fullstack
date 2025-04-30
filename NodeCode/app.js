import express from 'express';
import genrateRoute from './src/genrateRoutes.js';



const appRouter = express.Router();

appRouter.use("/api/v1",genrateRoute);


export default appRouter;