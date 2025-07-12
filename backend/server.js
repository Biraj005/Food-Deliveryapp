import express from 'express'
import cors from 'cors'
import { connetDb } from './config/db.js';
import foodRouter from './Routes/FoodRoute.js';
import userRouter from './Routes/UserRoutes.js';
import 'dotenv/config';


//app config

const app = express();
const PORT = 4000;

//middlewares

app.use(express.json());
app.use(cors());


connetDb();

// api endpoints

app.use('/api/food',foodRouter);
app.use('/images',express.static('uploads'));
app.use("/api/user",userRouter);


app.get('/',(req,res)=>{

    res.send('<h1>Hello</h1>');
})

app.listen(PORT,()=>{
    console.log(`the app is running at http://localhost:${PORT}`);
})