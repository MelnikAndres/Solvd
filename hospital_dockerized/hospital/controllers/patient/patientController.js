const patientRepository = require('../../repositories/PatientRepository');
const userRepository = require('../../repositories/UserRepository');

class PatientController{

    createPatient(req, res){
        if(req.role !== 'admin') return res.status(403)

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
        const isAuthorized = req.role === 'admin' || (req.role === 'patient' && userId === req.uid)
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

}

module.exports = new PatientController()
