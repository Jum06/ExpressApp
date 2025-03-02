import pool from '../db.js';

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
    return { id: result.insertId, ...inventoryChange };
};

export const updateInventoryChange = async (id, inventoryChange) => {
    const { product_id, user_id, type, change_amount, change_type, reason } = inventoryChange;
    const [result] = await pool.query(
        'UPDATE inventory_changes SET product_id = ?, user_id = ?, type = ?, change_amount = ?, change_type = ?, reason = ? WHERE id = ?',
        [product_id, user_id, type, change_amount, change_type, reason, id]
    );
    return result.affectedRows > 0 ? { id, ...inventoryChange } : null;
};

export const deleteInventoryChange = async (id) => {
    const [result] = await pool.query('DELETE FROM inventory_changes WHERE id = ?', [id]);
    return result.affectedRows > 0;
};