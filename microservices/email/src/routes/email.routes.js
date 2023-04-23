import Express from 'express';
import { sendMail } from '../services/email';

const emailRouter = Express.Router();

emailRouter.post('/send', (req, res) => {
    console.log("hey");
    const { email, subject, body } = req.body;
    sendMail(email, body, subject)
        .then(() => {
            res.status(200).json({ message: 'Email sent' });
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

export default emailRouter;
