const patientRepository = require('../repositories/PatientRepository')
const userService = require('./UserService')

class PatientService {
    async create(name, password, role, email, phone){
        const userId = await userService.create(name, password, role);
        await patientRepository.createPatient(userId, email,phone)
    }

    async update(email,phone,id){
        if(!email && !phone) return;
        await patientRepository.updatePatient(id, email,phone)
    }

    async getPatientById(id) {
        return await patientRepository.getPatientById(id)
    }

}


module.exports = new PatientService()
