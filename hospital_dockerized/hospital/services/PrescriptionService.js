const prescriptionRepository = require('../repositories/PrescriptionRepository')

class PrescriptionService{

    async create(appointment_id,patient_id,info,medicine){
        await prescriptionRepository.createPrescription(appointment_id,patient_id,info,medicine)
    }

    async getPrescriptionsByPatientId(patientId){
        return await prescriptionRepository.getPrescriptionsByPatientId(patientId)
    }

    async updatePrescription(medicine, info, id){
        if(!medicine && !info) return;
        await prescriptionRepository.updatePrescription(id, info, medicine)
    }

    async deletePrescription(id){
        await prescriptionRepository.deletePrescription(id)
    }
}

module.exports = new PrescriptionService()