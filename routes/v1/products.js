import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../services/productService.js';
import asyncHandler from '../../utils/asyncHandler.js';
import validate from '../../middleware/validate.js';
import { productSchema } from '../../schemas/productSchema.js';
import logger from '../../logger.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    logger.info('Fetching all products');
    const products = await getProducts();
    res.status(200).json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    logger.info(`Fetching product with id ${req.params.id}`);
    const product = await getProductById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send('Product not found');
    }
}));

router.post('/', validate(productSchema), asyncHandler(async (req, res) => {
    logger.info('Creating a new product');
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
}));

router.put('/:id', validate(productSchema), asyncHandler(async (req, res) => {
    logger.info(`Updating product with id ${req.params.id}`);
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (updatedProduct) {
        res.status(200).json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    logger.info(`Deleting product with id ${req.params.id}`);
    const deleted = await deleteProduct(req.params.id);
    if (deleted) {
        res.status(204).send('Product deleted');
    } else {
        res.status(404).send('Product not found');
    }
}));

export default router;