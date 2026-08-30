import express, { json } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorhandler.js';

import router from './routes/ideasroutes.js';
import connectDB from './config/db.js';
import authRouter from './routes/authroutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();


const PORT = process.env.PORT|| 8100;

//connect to db
connectDB();

const allowedOrigins = [
    'http://localhost:3000',
    'https://idea-drop-ui-eosin-rho.vercel.app'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//routes
app.use('/api/ideas', router);
app.use('/api/auth', authRouter);

//404 fall back

app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
})

app.use(errorHandler)


app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
})