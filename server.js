import express, { json } from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorhandler.js';

import router from './routes/ideasroutes.js';

dotenv.config();

const app = express();


const PORT = process.env.PORT|| 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api/ideas', router);

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