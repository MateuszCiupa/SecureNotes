import express from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { 
    getPasswordResetURL, 
    resetPasswordTemplate, 
    transporter,
    makeToken
} from '../modules/email.controller';
import { parseError } from './auth';

const emailRouter = express.Router();

emailRouter.post('/reset/password', async ({ body: { email } }, res) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return res.send(404).send({ message: '"email" not found' });
        const urlToken = makeToken(user);
        const url = getPasswordResetURL(user._id, urlToken);
        const emailTemplate = resetPasswordTemplate(user, url);

        transporter.sendMail(emailTemplate, (err, info) => {
            if (err) return res.status(500).send(parseError(err));
            console.log(`Response info: ${info}`);
        });
    } catch(err) {
        return res.status(500).send(parseError(err));
    }
});

emailRouter.patch('/reset/password/:userId/:token', async ({ body: { password }, params: { userId, token } }, res) => {
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) return res.sendStatus(403);

        jwt.verify(token, user.password, async (err, user) => {
            if (err) return res.sendStatus(403);

            const newHashPassword = await bcrypt.hash(password, 10);
            await User.findOneAndUpdate({ _id: user.userId }, { password: newHashPassword });

            return res.sendStatus(200);
        });
    } catch(err) {
        return res.status(500).send(parseError(err));
    }
});

export default emailRouter;