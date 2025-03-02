// routes/v1/inventoryChanges.js
import express from 'express';
import pool from '../../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM inventory_changes');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM inventory_changes WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { product_id, user_id, type, change_amount, change_type, reason } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO inventory_changes (product_id, user_id, type, change_amount, change_type, reason) VALUES (?, ?, ?, ?, ?, ?)',
            [product_id, user_id, type, change_amount, change_type, reason]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { product_id, user_id, type, change_amount, change_type, reason } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE inventory_changes SET product_id = ?, user_id = ?, type = ?, change_amount = ?, change_type = ?, reason = ? WHERE id = ?',
            [product_id, user_id, type, change_amount, change_type, reason, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json({ message: 'Inventory change updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM inventory_changes WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Inventory change not found' });
        }
        res.json({ message: 'Inventory change deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;