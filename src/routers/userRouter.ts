import express from 'express';
import { users } from '../state';
import { authMiddleware } from '../middleware/auth.middleware';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();

userRouter.get('', [authMiddleware(['admin', 'finance-manager']), (req, res) => {
    console.log('Retrieving users...');
    res.json(users);
}]);

userRouter.get('/:id', [(req, res, next) => {
    const userID: number = req.session.user.userId;
    const userRole: string = req.session.user.role.role;
    if ( userID === +req.params.id) {
        console.log('Id of user session matches requested user...');
        next();
    } else if (userRole === 'admin' || userRole === 'finance-manager') {
        console.log('User has the required permissions to view');
        next();
    } else {
        res.sendStatus(401);
    }
}, (req, res) => {
    const id: number = +req.params.id;
    console.log(`Getting user with id: ${req.params.id}...`);
    const user = users.find(u => u.userId === id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
}]);

userRouter.patch('', [authMiddleware(['admin']), (req, res) => {
    console.log(`Patching user with new data...`);

    res.send(`Server working on patching user record...`);
}]);