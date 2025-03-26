import express from 'express';
import { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../../services/categoryService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import validate from '../../middleware/validate.js';
import { categorySchema } from '../../schemas/categorySchema.js';
import logger from '../../logger.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    logger.info('Fetching all categories');
    const categories = await getCategories();
    res.status(200).json(categories);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    logger.info(`Fetching category with id ${req.params.id}`);
    const category = await getCategoryById(req.params.id);
    if (category) {
        res.status(200).json(category);
    } else {
        res.status(404).send('Category not found');
    }
}));

router.post('/', validate(categorySchema), asyncHandler(async (req, res) => {
    logger.info('Creating a new category');
    const newCategory = await createCategory(req.body);
    res.status(201).json(newCategory);
}));

router.put('/:id', validate(categorySchema), asyncHandler(async (req, res) => {
    logger.info(`Updating category with id ${req.params.id}`);
    const updatedCategory = await updateCategory(req.params.id, req.body);
    if (updatedCategory) {
        res.status(200).json(updatedCategory);
    } else {
        res.status(404).send('Category not found');
    }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    logger.info(`Deleting category with id ${req.params.id}`);
    const deleted = await deleteCategory(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Category not found');
    }
}));

export default router;