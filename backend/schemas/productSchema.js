// schemas/productSchema.js
import Joi from 'joi';

export const productSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(1000),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    demand: Joi.number().integer().min(0).required(),
    category_id: Joi.number().integer().optional()
});