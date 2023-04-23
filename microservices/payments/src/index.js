import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { makeResponse } from './utils/response';
import paymentRouter from './routes/payment.routes';

const app = Express();
dotenv.config();

//MIDDLEWARE
app.use(cors());
app.use(Express.json({ limit: '1mb' }));
app.use(Express.urlencoded({ extended: true }));

//ROUTES
app.use('/api/payment', paymentRouter);

app.use((err, req, res, next) => {
    if (err.expose) {
        return makeResponse({ res, status: err.status, message: err.message });
    }
});

const start = async () => {
    app.listen(3005, () => {
        console.log('payment service listening on port 3005');
    });
};

start();
