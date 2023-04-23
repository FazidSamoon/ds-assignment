import Express from 'express';
import Stripe from 'stripe';
const stripe = new Stripe('pk_test_51LSNp7IFgBGrRGBPLrWtRg83OflcYL1h8uktQki0Tdfg9OnnyRf8f0M51usgQgolTSvtPDAgsPdCsmz2q9EsZCT200ko6ijbjS');
const paymentRouter = Express.Router();

paymentRouter.post('/', (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd'
        },
        (stripeErr, stripeRes) => {
            if (stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

export default paymentRouter;
