import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/userRouter';
import { reimbursementRouter } from './routers/reimburseRouter';
import { sessionMiddleware } from './middleware/session.middleware';
import { users } from './state';

const app = express();

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = user;
        console.log('User successfully signed in...');
        res.end();
    } else {
        res.send('Invalid Credentials');
        res.sendStatus(400);
    }
});

/**
 * Register routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(8008);

