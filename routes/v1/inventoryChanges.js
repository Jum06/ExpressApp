import express from 'express';
import { getInventoryChanges, getInventoryChangeById, createInventoryChange, updateInventoryChange, deleteInventoryChange } from '../../services/inventoryChangeService.js';
import validate from '../../middleware/validate.js';
import { inventoryChangeSchema } from '../../schemas/inventoryChangeSchema.js';
import logger from '../../logger.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        logger.info('Fetching all inventory changes');
        const inventoryChanges = await getInventoryChanges();
        res.json(inventoryChanges);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        logger.info(`Fetching inventory change with id ${req.params.id}`);
        const inventoryChange = await getInventoryChangeById(req.params.id);
        if (!inventoryChange) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json(inventoryChange);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post('/', validate(inventoryChangeSchema), async (req, res) => {
    try {
        logger.info('Creating a new inventory change');
        const newInventoryChange = await createInventoryChange(req.body);
        res.status(201).json(newInventoryChange);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', validate(inventoryChangeSchema), async (req, res) => {
    try {
        logger.info(`Updating inventory change with id ${req.params.id}`);
        const updatedInventoryChange = await updateInventoryChange(req.params.id, req.body);
        if (!updatedInventoryChange) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json({ message: 'Inventory change updated' });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        logger.info(`Deleting inventory change with id ${req.params.id}`);
        const deleted = await deleteInventoryChange(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json({ message: 'Inventory change deleted' });
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ error: err.message });
    }
});

export default router;