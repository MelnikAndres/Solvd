const patientRepository = require('../../repositories/PatientRepository');
const userRepository = require('../../repositories/UserRepository');
const { isAdmin, isPatient } = require('../../utils/Authorization');

class PatientController{

    createPatient(req, res){
        if(!isAdmin(req.role)) return res.status(403)

        const createPatientSchema = require('./schemas/createPatientSchema')
        const errors = createPatientSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        userRepository.createUser(req.body).then((result) => {
            patientRepository.createPatient(result.id, req.body).then(() => {
                res.sendStatus(200)
            })
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    updatePatient(req, res){
        const userId = +req.params.id
        const isAuthorized = isAdmin(req.role) || (isPatient(req.role) && isSameUser(userId,req.uid))
        if(!isAuthorized) return res.status(403)

        const updatePatientSchema = require('./schemas/updatePatientSchema')
        const errors = updatePatientSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        if(!req.body.email && !req.body.phone) return res.sendStatus(200)
        patientRepository.updatePatient(req.params.id, req.body).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getPatientByUserId(req, res){
        const userId = +req.params.id
        const isAuthorized = isAdmin(req.role) || (isPatient(req.role) && isSameUser(userId,req.uid))
        if(!isAuthorized) return res.status(403)
        patientRepository.getPatientById(userId).then((patient) => {
            res.status(200).json(patient)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

}

module.exports = new PatientController()
