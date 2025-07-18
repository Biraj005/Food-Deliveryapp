import express from 'express';
import { placeOrder, verifyOrder } from '../controllers/OrderController.js';
import authMiddlewere from '../Middlewares/auth.js';

const orderRouter = express.Router();


orderRouter.post("/place",authMiddlewere,placeOrder);
orderRouter.post("/verify",authMiddlewere,verifyOrder);


export default orderRouter;
