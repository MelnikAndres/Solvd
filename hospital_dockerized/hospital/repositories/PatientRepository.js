const db = require('../utils/DBconnection')
const TABLE_NAME = '"Patients"'
class PatientRepository{
    createPatient(user_id,patient){
        const email = patient.email? `'${patient.email}'`: null
        const phone = patient.phone? `'${patient.phone}'`: null
        return db.none(`insert into ${TABLE_NAME} (user_id, email, phone)
        values ('${user_id}',${email}, ${phone});`)
    }

    updatePatient(id, patient){
        let updateQuery = `update ${TABLE_NAME} set `
        if(patient.email) updateQuery += `email = '${patient.email}'`
        if(patient.phone) updateQuery += (patient.email? ", ": "") +`phone = '${patient.phone}'`
        updateQuery += ` where id=${id};`
        return db.none(updateQuery)
    }

    getPatientByUserId(id){
        return db.oneOrNone(`select * from ${TABLE_NAME} where user_id=${id};`)
    }
}

module.exports = new PatientRepository()