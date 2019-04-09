import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/userRouter';
import { reimbursementRouter } from './routers/reimburseRouter';

const app = express();

app.use(bodyParser.json());

app.post('/login', (req, res) => {

});

/**
 * Register routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(8008);

