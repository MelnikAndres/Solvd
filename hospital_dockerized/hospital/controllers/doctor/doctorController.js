const doctorRepository = require('../../repositories/DoctorRepository');
const userRepository = require('../../repositories/UserRepository');

class DoctorController{

    createDoctor(req, res){
        if(req.role !== 'admin') return res.sendStatus(403)

        const createDoctorSchema = require('./schemas/createDoctorSchema')
        const errors = createDoctorSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        userRepository.createUser(req.body).then((result) => {
            doctorRepository.createDoctor(result.id, req.body.specialization).then(() => {
                res.sendStatus(200)
            })
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
        
    }

    updateDoctor(req, res){
        const userId = +req.params.id
        const isAuthorized = req.role === 'admin' || (req.role === 'doctor' && userId === req.uid)
        if(!isAuthorized) return res.sendStatus(403)
        const updateDoctorSchema = require('./schemas/updateDoctorSchema.js')
        const errors = updateDoctorSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        doctorRepository.updateDoctor(userId, req.body.specialization).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getDoctorByUserId(req, res){
        const userId = +req.params.id
        const isAuthorized = req.role === 'admin' || (req.role === 'doctor' && userId === req.uid)
        if(!isAuthorized) return res.sendStatus(403)
        doctorRepository.getDoctorByUserId(userId).then((doctor) => {
            if(!doctor) return res.sendStatus(404)
            res.status(200).json(doctor)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }


}

module.exports = new DoctorController()