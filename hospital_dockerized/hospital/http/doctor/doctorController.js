const doctorModel = require('../../models/Doctor');


class DoctorController{

    createDoctor(req, res){
        if(req.role !== 'admin') return res.status(403)

        const createDoctorSchema = require('./schemas/createDoctorSchema')
        const errors = createDoctorSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        doctorModel.createDoctor(req.body.user_id, req.body.specialization).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }
}

module.exports = new DoctorController()