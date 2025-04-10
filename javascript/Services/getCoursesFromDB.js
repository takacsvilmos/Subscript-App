import {db} from "../query/db.js";

async function getCoursesFromDB() {
    try {
        const courses = await db.pool.query("SELECT * FROM kurzus_nevezes.KURZUS");

        if (courses.length > 0) {
            return courses;
        } else {
            console.log("No courses found");
        }
    } catch
        (err) {
        console.log(err);
    }
}

export default getCoursesFromDB;