import {db} from "../query/db.js";

async function insertBillingInfo(applicationId, billingInfoObject) {
    const insertQuery = "INSERT INTO kurzus_nevezes.SZAMLA (nevezes_id, adoszam, szamlanev, iranyitoszam, telepules, utca_hsz) VALUES (?, ?, ?, ?, ?, ?)";

    const result = await db.pool.query(insertQuery, [applicationId, billingInfoObject.taxNumber, billingInfoObject.invoiceName, billingInfoObject.zipCode, billingInfoObject.city, billingInfoObject.address]);
    console.log(`Customer ${billingInfoObject.invoiceName} with ${applicationId} inserted to database: `, result);
}

export default insertBillingInfo;