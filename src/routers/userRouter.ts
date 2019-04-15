import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as userDao from '../daos/users.dao';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();

userRouter.get('', [authMiddleware(['admin', 'finance-manager']), async (req, res) => {
    console.log('Retrieving users...');
    const user = await userDao.findAllUsers();
    res.json(user);
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
        const resp = {
            message: 'The incoming token has expired'
        };
        res.status(401).json(resp);
    }
}, async (req, res) => {
    const id: number = +req.params.id;
    console.log(`Getting user with id: ${req.params.id}...`);
    const user = await userDao.findUserByID(id);
    if (user) {
        res.json(user);
    } else {
        res.sendStatus(404);
    }
}]);

userRouter.patch('', [authMiddleware(['admin']), async (req, res) => {
    console.log(`Patching user with new data...`);
    const { userId } = req.body;
    const user = await userDao.findUserByID(userId);
    const newUser = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        role: undefined
    };
    if (req.body.username !== undefined) {
        newUser.username = req.body.username;
    } else {
        newUser.username = user.username;
    }
//  -----------------------------------------
    if (req.body.password !== undefined) {
        newUser.password = req.body.password;
    } else {
        newUser.password = user.password;
    }
//  -------------------------------------------
    if (req.body.firstName !== undefined) {
        newUser.firstName = req.body.firstName;
    } else {
        newUser.firstName = user.firstName;
    }
//  ------------------------------------------
    if (req.body.lastName !== undefined) {
        newUser.lastName = req.body.lastName;
    } else {
        newUser.lastName = user.lastName;
    }
//  ------------------------------------------
    if (req.body.email !== undefined) {
        newUser.email = req.body.email;
    } else {
        newUser.email = user.email;
    }
//  -----------------------------------------
    if (req.body.role !== undefined) {
        newUser.role = req.body.role;
    } else {
        newUser.role = user.role.roleID;
    }
    await userDao.updateUser(user.userId, newUser.username, newUser.password, newUser.firstName, newUser.lastName, newUser.email,
        newUser.role);

    console.log(`User ${userId} has been updated`);
    const updateUser = await userDao.findUserByID(userId);
    res.send(updateUser);
}]);