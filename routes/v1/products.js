import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../services/productService.js';
import asyncHandler from '../../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const products = await getProducts();
    res.status(200).json(products);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const product = await getProductById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).send('Product not found');
    }
}));

router.post('/', asyncHandler(async (req, res) => {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const updatedProduct = await updateProduct(req.params.id, req.body);
    if (updatedProduct) {
        res.status(200).json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const deleted = await deleteProduct(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Product not found');
    }
}));

export default router;