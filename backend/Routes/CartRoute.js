import express from 'express';
import { addToCart,removeFromCart,getCart } from '../controllers/CartControlle.js';
import authMiddlewere from '../Middlewares/auth.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddlewere,addToCart);
cartRouter.post('/remove',authMiddlewere,removeFromCart);
cartRouter.post('/get',authMiddlewere,getCart);

export default cartRouter;

