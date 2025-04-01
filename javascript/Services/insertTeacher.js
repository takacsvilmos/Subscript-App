import {db} from '../query/db.js';

async function insertTeacher(teacher) {
   try {
       const insertQuery = "INSERT INTO kurzus_nevezes.TANAR (vezeteknev, keresztnev, iskolai_email, privat_email, mobil_telefonszam, korabban_nevezett) VALUES (?, ?, ?, ?, ?, ?)";

       const result = await db.pool.query(insertQuery, [teacher.lastName, teacher.firstName, teacher.schoolMail, teacher.privateMail, teacher.mobile, teacher.previousApplication]);

       console.log(`${teacher.firstName} ${teacher.lastName} inserted to database: `, result);
   }catch(err){
       console.log(err);
   }
}

export default insertTeacher;