import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/userRouter';
import { reimbursementRouter } from './routers/reimburseRouter';
import { sessionMiddleware } from './middleware/session.middleware';
import { users } from './state';
import { findAllUsers } from './daos/users.dao';

const app = express();

app.use(bodyParser.json());

app.use(sessionMiddleware);

findAllUsers();

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        console.log('User successfully signed in...');
        res.end();
    } else {
        res.status(400).send('Invalid Credentials');
    }
});

/**
 * Register routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(8008);

