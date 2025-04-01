import {db} from '../query/db.js';

async function selectSchool(OMR9) {
    try {
        // Use pool.query to get all contacts
        const selectedSchool = await db.pool.query("SELECT * FROM kurzus_nevezes.ISKOLA WHERE OMR9 = ? ", [OMR9]);

        if (selectedSchool.length > 0) {
            return selectedSchool[0];
        } else {
            console.log("No school found");
        }
    } catch
        (err) {
        console.log(err);
    }
}

export default selectSchool;