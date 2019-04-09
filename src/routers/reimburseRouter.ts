import express from 'express';

/**
 * Reimbursement router will handle all requests starting with
 * /reimbursement
 */
 export const reimbursementRouter = express.Router();

 reimbursementRouter.get('/status/:statusid', (req, res) => {
    console.log(`Server is getting reimbursements with status: ${req.params.statusid}...`);
    res.send(`Server is working to find reimbursement with status`);
 });

 reimbursementRouter.get('/author/userId:userId', (req, res) => {
    console.log(`Server is getting reimbursements belonging to an author with an authorID: ${req.params.userId}...`);
    res.send(`Server is working to return a user`);
 });

 reimbursementRouter.post('', (req, res) => {
    console.log(`Server is posting reimbursement data...`);
 });

 reimbursementRouter.patch('', (req, res) => {
    console.log(`Server is patching reimbursement information...`);
 });