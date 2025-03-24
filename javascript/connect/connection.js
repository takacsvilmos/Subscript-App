import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

async function asyncFunction() {
    let conn;
    try {
        // Create a new connection
        conn = await mariadb.createConnection({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.DB_USER,
            password: process.env.PASSWORD,
        });

        // Print connection thread
        console.log(`Connected! (id=${conn.threadId})`);
    } catch (err) {
        // Print error
        console.log(err);
    } finally {
        // Close connection
        if (conn) await conn.close();
    }
}

asyncFunction();