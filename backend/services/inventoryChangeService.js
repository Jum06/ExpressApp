// backend/services/inventoryChangeService.js
import pool from '../db.js';
import { broadcastProductUpdate } from '../server.js';
import {getProductById} from "./productService.js";

export const getInventoryChanges = async () => {
    const [rows] = await pool.query('SELECT * FROM inventory_changes');
    return rows;
};

export const getInventoryChangeById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM inventory_changes WHERE id = ?', [id]);
    return rows[0];
};

export const createInventoryChange = async (change) => {
    const { product_id, change_type, quantity, reason, changed_by, changed_at } = change;
    const [result] = await pool.query(
        'INSERT INTO inventory_changes (product_id, change_type, quantity, reason, changed_by, changed_at) VALUES (?, ?, ?, ?, ?, ?)',
        [product_id, change_type, quantity, reason, changed_by, changed_at]
    );

    const product = await getProductById(product_id);
    if (product) {
        broadcastProductUpdate(product);
    }

    return { id: result.insertId, ...change };
};

export const updateInventoryChange = async (id, change) => {
    const { product_id, change_type, quantity, reason, changed_by, changed_at } = change;
    const [result] = await pool.query(
        'UPDATE inventory_changes SET product_id = ?, change_type = ?, quantity = ?, reason = ?, changed_by = ?, changed_at = ? WHERE id = ?',
        [product_id, change_type, quantity, reason, changed_by, changed_at, id]
    );
    if (result.affectedRows > 0) {
        return { id, ...change };
    }
    return null;
};

export const deleteInventoryChange = async (id) => {
    const [result] = await pool.query('DELETE FROM inventory_changes WHERE id = ?', [id]);
    return result.affectedRows > 0;
};