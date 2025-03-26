// schemas/inventoryChangeSchema.js
import Joi from 'joi';

export const inventoryChangeSchema = Joi.object({
    product_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    type: Joi.string().valid('stock', 'demand').required(),
    change_amount: Joi.number().integer().not(0).required(),
    change_type: Joi.string().valid('purchase', 'restock', 'sale', 'correction').required(),
    reason: Joi.string().max(1000).optional()
});