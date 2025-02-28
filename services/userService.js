// services/userService.js
import pool from '../db.js';

export const getUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
};

export const getUserById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

export const createUser = async (user) => {
    const { username, email } = user;
    const [result] = await pool.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);
    return { id: result.insertId, ...user };
};

export const updateUser = async (id, user) => {
    const { username, email } = user;
    const [result] = await pool.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id]);
    return result.affectedRows > 0 ? { id, ...user } : null;
};

export const deleteUser = async (id) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
};