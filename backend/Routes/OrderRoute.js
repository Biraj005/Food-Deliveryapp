import express from 'express';
import { placeOrder, verifyOrder ,userOrders, listOrdees, updateSatus } from '../controllers/OrderController.js';
import authMiddlewere from '../Middlewares/auth.js';

const orderRouter = express.Router();


orderRouter.post("/place",authMiddlewere,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddlewere,userOrders);
orderRouter.get("/list",listOrdees);
orderRouter.post("/status",updateSatus);


export default orderRouter;
