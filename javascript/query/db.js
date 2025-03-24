import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

// Expose the Pool object within this module
export const db = {
    pool: mariadb.createPool({
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.DB_USER,
        password: process.env.PASSWORD,
    })
};
