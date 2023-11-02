const db = require('../utils/DBconnection')

class PatientRepository{
    createPatient(user_id,patient){
        const email = patient.email? `'${patient.email}'`: null
        const phone = patient.phone? `'${patient.phone}'`: null
        return db.none(`insert into "Patients" (user_id, email, phone)
        values ('${user_id}',${email}, ${phone});`)
    }

    updatePatient(id, patient){
        let updateQuery = `update "Patients" set `
        if(patient.email) updateQuery += `email = '${patient.email}'`
        if(patient.phone) updateQuery += (patient.email? ", ": "") +`phone = '${patient.phone}'`
        updateQuery += ` where id=${id};`
        return db.none(updateQuery)
    }
}

module.exports = new PatientRepository()