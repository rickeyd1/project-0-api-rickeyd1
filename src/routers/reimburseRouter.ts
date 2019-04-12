import express from 'express';

/**
 * Reimbursement router will handle all requests starting with
 * /reimbursement
 */
 export const reimbursementRouter = express.Router();

 reimbursementRouter.get('/status/:statusid/date-submitted', (req, res) => {
   console.log(`Server is getting reimbursements with status: ${req.params.statusid}...`);
   const {start, end } = req.query;
   console.log(`Start date = ${+start}
   end date = ${+end}`);

   res.send(`Server is working to find reimbursement with status ${req.params.statusid}`);
 });

 reimbursementRouter.get('/author/userId/:userId/date-submitted', (req, res) => {
    const { start, end } = req.query;
    console.log(`Start date = ${+start}
    end date = ${+end}`);

    console.log(`Server is getting reimbursements belonging to an author with an authorID: ${req.params.userId}...`);
    res.send(`Server is working to return a user`);
 });

 reimbursementRouter.post('', (req, res) => {
    const reIm = req.body;
    console.log(`Server is posting reimbursement data...`);
    res.send(reIm);
    res.sendStatus(201);
 });

 reimbursementRouter.patch('', (req, res) => {
    console.log(`Server is patching reimbursement information...`);
 });