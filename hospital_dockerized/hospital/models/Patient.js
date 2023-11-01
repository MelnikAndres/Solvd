const db = require('../utils/DBconnection')

class Patient{
    createPatient(patient){
        return db.none(`insert into "Patients" (user_id, email, phone)
        values ('${patient.user_id}', '${patient.email}', '${patient.phone}');`)
    }

    updatePatient(id, patient){
        let updateQuery = `update "Patients" set `
        if(patient.email) updateQuery += `email = '${patient.email}'`
        if(patient.phone) updateQuery += (patient.email? ", ": "") +`phone = '${patient.phone}'`
        updateQuery += ` where id=${id};`
        return db.none(updateQuery)
    }
}

module.exports = new Patient()