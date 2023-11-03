const db = require('../utils/DBconnection')
const TABLE_NAME = '"Prescriptions"'
class PrescriptionRepository{
    createPrescription(prescription){
        return db.none(`insert into ${TABLE_NAME} (appointment_id, patient_id, info, medicine)
        values ('${prescription.appointment_id}', '${prescription.patient_id}', '${prescription.info}', '${prescription.medicine}');`)
    }

    getPrescriptionsByPatientId(patient_id){
        return db.any(`SELECT * FROM ${TABLE_NAME} WHERE patient_id = '${patient_id}'`)
    }

    updatePrescription(id, prescription){
        let updateQuery = `update ${TABLE_NAME} set `
        if(prescription.info) updateQuery += `info = '${prescription.info}'`
        if(prescription.medicine) updateQuery += (prescription.info? ", ": "") +`medicine = '${prescription.medicine}'`
        updateQuery += ` where id=${id};`
        return db.none(updateQuery)
    }

    deletePrescription(id){
        return db.none(`delete from ${TABLE_NAME} where id=${id};`)
    }
}

module.exports = new PrescriptionRepository()