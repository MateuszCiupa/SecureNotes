import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectStore from 'connect-mongo';
import userRouter from './routes/auth';
import postRouter from './routes/post';
require('dotenv').config();

const {
    PORT = 8080,
    DB_CONNECTION='mongodb://user:pwd@pamw_just_dev_mongo:27017/mydb',
    SESS_SECRET='secret',
    SESS_NAME='sid',
} = process.env;

(async () => {
    try {
        await mongoose.connect(
            DB_CONNECTION, 
            {useNewUrlParser: true, useUnifiedTopology: true}, 
            err => {
                if (err) console.log(err);
                else console.log('Auth server connected to db')
            }
        );

        const app = express();
        app.use(express.json());

        const MongoStore = connectStore(session);

        app.use(session({
            name: SESS_NAME,
            cookie: {
                maxAge: 1000 * 60 * 60 * 2,
                sameSite: true
            },
            resave: false,
            saveUninitialized: false,
            secret: SESS_SECRET,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                collection: 'session',
                ttl: 60 * 60 * 2
            })
        }));

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/user', userRouter);
        apiRouter.use('/post', postRouter);

        app.listen(PORT, () => console.log(`Auth server is running on port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
})();