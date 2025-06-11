import pool from '../db.js';
import { broadcastStockUpdate } from '../server.js';

export const getInventoryChanges = async () => {
    const [rows] = await pool.query('SELECT * FROM inventory_changes');
    return rows;
};

export const getInventoryChangeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM inventory_changes WHERE id = ?', [id]);
    return rows[0];
};

export const createInventoryChange = async (inventoryChange) => {
    const { product_id, user_id, type, change_amount, change_type, reason } = inventoryChange;
    const [result] = await pool.query(
        'INSERT INTO inventory_changes (product_id, user_id, type, change_amount, change_type, reason) VALUES (?, ?, ?, ?, ?, ?)',
        [product_id, user_id, type, change_amount, change_type, reason]
    );
    const [productRows] = await pool.query('SELECT stock, demand FROM products WHERE id = ?', [product_id]);
    if (productRows.length > 0) {
        broadcastStockUpdate(product_id, productRows[0].stock, productRows[0].demand);
    }
    return { id: result.insertId, ...inventoryChange };
};

export const updateInventoryChange = async (id, inventoryChange) => {
    const { product_id, user_id, type, change_amount, change_type, reason } = inventoryChange;
    const [result] = await pool.query(
        'UPDATE inventory_changes SET product_id = ?, user_id = ?, type = ?, change_amount = ?, change_type = ?, reason = ? WHERE id = ?',
        [product_id, user_id, type, change_amount, change_type, reason, id]
    );
    if (result.affectedRows > 0) {
        const [productRows] = await pool.query('SELECT stock, demand FROM products WHERE id = ?', [product_id]);
        if (productRows.length > 0) {
            broadcastStockUpdate(product_id, productRows[0].stock, productRows[0].demand);
        }
        return { id, ...inventoryChange };
    }
    return null;
};

export const deleteInventoryChange = async (id) => {
    const [result] = await pool.query('DELETE FROM inventory_changes WHERE id = ?', [id]);
    return result.affectedRows > 0;
};