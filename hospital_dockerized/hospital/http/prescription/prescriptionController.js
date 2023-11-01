const prescriptionModel = require('../../models/Prescription')

class PrescriptionController{

    createPrescription(req, res){
        if(req.role !== 'doctor') return res.status(403)

        const prescriptionSchema = require('./schemas/prescriptionSchema')
        const errors = prescriptionSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        prescriptionModel.createPrescription(req.body).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getPrescriptionsByPatientId(req, res){
        const userId = +req.params.id
        const isAuthorized = req.role === 'admin' || (req.role === 'patient' && userId === req.uid)
        if(!isAuthorized) return res.status(403)
        prescriptionModel.getPrescriptionsByPatientId(req.params.id).then((prescriptions) => {
            res.status(200).json(prescriptions)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

}

module.exports = new PrescriptionController()
