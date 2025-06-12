import pool from '../db.js';
import { broadcastProductUpdate } from '../server.js';

export const getProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

export const getProductById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
};

export const createProduct = async (product) => {
    const { name, description, price, stock, demand, category_id } = product;
    const [result] = await pool.query(
        'INSERT INTO products (name, description, price, stock, demand, category_id) VALUES (?, ?, ?, ?, ?, ?)',
        [name, description, price, stock, demand, category_id]
    );
    return { id: result.insertId, ...product };
};
export const updateProduct = async (id, product) => {
    const { name, description, price, stock, demand } = product;
    await pool.query(
        'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, demand = ? WHERE id = ?',
        [name, description, price, stock, demand, id]
    );
    const updatedProduct = await getProductById(id);
    if (updatedProduct) {
        broadcastProductUpdate(updatedProduct);
        return { id, ...product };
    }
    return null;
};

export const deleteProduct = async (id) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
};