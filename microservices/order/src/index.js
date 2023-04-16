import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';
import connectDB from './database';
import orderRouter from './routes/order.routes';
import { makeResponse } from './utils/response';

const app = Express();
dotenv.config();

//MIDDLEWARE
app.use(cors());
app.use(Express.json({ limit: '1mb' }));
app.use(Express.urlencoded({ extended: true }));

//ROUTES
app.use('/api/order/', orderRouter);

app.use((err, req, res, next) => {
    console.log(err)
    if (isCelebrateError(err)) {
        for (const [key, value] of err.details.entries()) {
            return makeResponse({ res, status: 422, message: value.details[0].message });
        }
    } else if (err.expose) {
        return makeResponse({ res, status: err.status, message: err.message });
    } else if (err.name == 'MongoServerError' && err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        return makeResponse({ res, status: 400, message: `The ${key} ${err.keyValue[key]} is already taken` });
    } 
});

const start = async () => {
    await connectDB();
    app.listen(3002, () => {
        console.log('Order service listening on port 3002');
    });
}

start();

