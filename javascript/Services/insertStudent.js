import {db} from "../query/db.js"
import insert from "../query/insert.js";

async function insertStudent(applicationId, studentData) {

    const insertQuery = "INSERT INTO kurzus_nevezes.HALLGATO (nevezes_id, kurzus_id, vezeteknev, keresztnev, evfolyam) VALUES (?, ?, ?, ?, ?)";

    const result = await db.pool.query(insertQuery, [applicationId, studentData.course, studentData.lastName, studentData.firstName, studentData.class]);
    console.log(`Student ${studentData.firstName} ${studentData.lastName} inserted to database: `, result);

}

export default insertStudent;