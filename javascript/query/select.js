import {db} from './db.js';

async function select() {
    try {
        // Use pool.query to get all contacts
        var rows = await db.pool.query("SELECT * FROM demo.contacts");

        // Print list of contacts
        for (let i = 0, len = rows.length; i < len; i++) {
            console.log(`(id=${rows[i].id}) ${rows[i].first_name} ${rows[i].last_name} <${rows[i].email}>`);
        }
    } catch (err) {
        // Print errors
        console.log(err);
    } finally {
		db.pool.end();
	}
}

export default select;