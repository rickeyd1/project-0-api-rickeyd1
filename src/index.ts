import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/userRouter';
import { reimbursementRouter } from './routers/reimburseRouter';
import { sessionMiddleware } from './middleware/session.middleware';
import * as userDao from './daos/users.dao';

const app = express();
const port = process.env.SHIP_PORT || 8080;

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userDao.findUsernameAndPassword(username, password);

    if (user) {
        req.session.user = user;
        console.log('User successfully signed in...');
        res.json(user);
    } else {
        const resp = {
            message: 'Invalid credentials'
        };
        res.status(400).json(resp);
    }
});

app.use('/hi', (req, res) => {
    res.send('Hi I work.');
});

/**
 * Register routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(port, () => {
    console.log('application started');
});

