// schemas/categorySchema.js
import Joi from 'joi';

export const categorySchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(1000).optional()
});