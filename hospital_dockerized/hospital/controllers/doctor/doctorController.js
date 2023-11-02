const doctorRepository = require('../../repositories/DoctorRepository');
const userRepository = require('../../repositories/UserRepository');

class DoctorController{

    createDoctor(req, res){
        if(req.role !== 'admin') return res.status(403)

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
}

module.exports = new DoctorController()