import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../services/userService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import validate from '../../middleware/validate.js';
import { userSchema } from '../../schemas/userSchema.js';
import logger from '../../logger.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    logger.info('Fetching all users');
    const users = await getUsers();
    res.status(200).json(users);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    logger.info(`Fetching user with id ${req.params.id}`);
    const user = await getUserById(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
}));

router.post('/', validate(userSchema), asyncHandler(async (req, res) => {
    logger.info('Creating a new user');
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
}));

router.put('/:id', validate(userSchema), asyncHandler(async (req, res) => {
    logger.info(`Updating user with id ${req.params.id}`);
    const updatedUser = await updateUser(req.params.id, req.body);
    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    logger.info(`Deleting user with id ${req.params.id}`);
    const deleted = await deleteUser(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
}));

export default router;