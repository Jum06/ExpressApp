// middleware/adminMiddleware.js
import pool from '../db.js';

const isAdmin = async (req, res, next) => {
    const userId = req.user.id; // Assuming req.user contains the authenticated user's info
    const [rows] = await pool.query('SELECT r.name FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = ?', [userId]);
    const roles = rows.map(row => row.name);
    if (roles.includes('Admin')) {
        next();
    } else {
        res.status(403).send('Access denied');
    }
};

export default isAdmin;