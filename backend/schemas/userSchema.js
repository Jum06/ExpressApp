// schemas/userSchema.js
import Joi from 'joi';

export const userSchema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required()
});