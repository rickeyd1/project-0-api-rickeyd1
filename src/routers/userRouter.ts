import express from 'express';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();

userRouter.get('', (req, res) => {
    console.log("Retrieving users...");
    res.send("Server working on returning users...")
});

userRouter.get('/:id', (req, res) => {
    console.log(`Getting user with id: ${req.params.id}...`);
    res.send(`Server working on returning user with id: ${req.params.id}...`);

});

userRouter.patch('', (req, res) => {
    console.log(`Patching user with new data...`);
    res.send(`Server working on patching user record...`);
});

