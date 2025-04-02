import {db} from "../query/db.js"

async function insertApplication(applicationData) {
    const insertQuery = "INSERT INTO kurzus_nevezes.NEVEZES (tanar_id, OMR9, fizetesi_mod_id, szamlat_ker, megjegyzes, osszeg, adatvedelmi_elfogadva) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const result = await db.pool.query(insertQuery, [applicationData.teacherId, applicationData.schoolCode, applicationData.paymentMethod, applicationData.invoiceNeeded, applicationData.comments, applicationData.price, applicationData.privacyPolicy]);
    console.log(`Application ${applicationData.teacherId} with schoolcode: ${applicationData.schoolCode} inserted to database: `, result);
}

export default insertApplication;