import {db} from './db.js';

async function asyncFunction() {
    let conn;
    try { 
        // Acquire a connection from the connection pool
        conn = await db.pool.getConnection();

        // Execute query to create a new database
        await conn.query("CREATE DATABASE IF NOT EXISTS kurzus_nevezes CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci");
        console.log("kurzus_nevezes database created.");

        // Execute query to create a new table
    } catch (err) {
        // Print error
        console.log(err);
    } finally {
        // Release the connection back into the connection pool
        if (conn) await conn.release();
		db.pool.end();
    }
}

asyncFunction();