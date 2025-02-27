import pool from '../db.js';

export const getProducts = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

export const getProductById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
};

export const createProduct = async (product) => {
    const { name, description, price, stock, demand } = product;
    const [result] = await pool.query('INSERT INTO products (name, description, price, stock, demand) VALUES (?, ?, ?, ?, ?)', [name, description, price, stock, demand]);
    return { id: result.insertId, ...product };
};

export const updateProduct = async (id, product) => {
    const { name, description, price, stock, demand } = product;
    const [result] = await pool.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, demand = ? WHERE id = ?', [name, description, price, stock, demand, id]);
    return result.affectedRows > 0 ? { id, ...product } : null;
};

export const deleteProduct = async (id) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
};