// routes/v1/users.js
import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../../services/userService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import validate from '../../middleware/validate.js';
import { userSchema } from '../../schemas/userSchema.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
}));

router.post('/', validate(userSchema), asyncHandler(async (req, res) => {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
}));

router.put('/:id', validate(userSchema), asyncHandler(async (req, res) => {
    const updatedUser = await updateUser(req.params.id, req.body);
    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const deleted = await deleteUser(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
}));

export default router;