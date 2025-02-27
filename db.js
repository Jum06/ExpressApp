import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: "localhost",
    port: 53306,
    user: "stockmanager",
    password: "stockmanager",
    database: "stockmanager",
    waitForConnections: true
});

export default pool;