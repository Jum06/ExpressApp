import express from 'express';
import { getInventoryChanges, getInventoryChangeById, createInventoryChange, updateInventoryChange, deleteInventoryChange } from '../../services/inventoryChangeService.js';
import validate from '../../middleware/validate.js';
import { inventoryChangeSchema } from '../../schemas/inentoryChangeSchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const inventoryChanges = await getInventoryChanges();
        res.json(inventoryChanges);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const inventoryChange = await getInventoryChangeById(req.params.id);
        if (!inventoryChange) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json(inventoryChange);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', validate(inventoryChangeSchema), async (req, res) => {
    try {
        const newInventoryChange = await createInventoryChange(req.body);
        res.status(201).json(newInventoryChange);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', validate(inventoryChangeSchema), async (req, res) => {
    try {
        const updatedInventoryChange = await updateInventoryChange(req.params.id, req.body);
        if (!updatedInventoryChange) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json({ message: 'Inventory change updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleted = await deleteInventoryChange(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json({ message: 'Inventory change deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;