const db = require('../utils/DBconnection')

class Prescription{
    createPrescription(prescription){
        return db.none(`insert into "Prescriptions" (appointment_id, patient_id, info, medicine)
        values ('${prescription.appointment_id}', '${prescription.patient_id}', '${prescription.info}', '${prescription.medicine}');`)
    }

    getPrescriptionsByPatientId(patient_id){
        return db.any(`SELECT * FROM "Prescriptions" WHERE patient_id = '${patient_id}'`)
    }
}

module.exports = new Prescription()