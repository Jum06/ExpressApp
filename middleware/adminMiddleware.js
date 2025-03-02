import pool from '../db.js';
import logger from '../logger.js';

const isAdmin = async (req, res, next) => {
    const userId = req.user.id; // Assuming req.user contains the authenticated user's info
    try {
        logger.info(`Checking admin status for user with id ${userId}`);
        const [rows] = await pool.query('SELECT r.name FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = ?', [userId]);
        const roles = rows.map(row => row.name);
        if (roles.includes('Admin')) {
            next();
        } else {
            res.status(403).send('Access denied');
        }
    } catch (err) {
        logger.error(err.message);
        res.status(500).send('Internal Server Error');
    }
};

export default isAdmin;