const appointmentRepository = require('../../repositories/AppointmentRepository')
const derivationRepository = require('../../repositories/DerivationRepository')


class DerivationController{

    createDerivation(req, res){
        const isAuthorized = req.role === 'admin' || req.role === 'patient'
        if(!isAuthorized) return res.sendStatus(403)
        const createDerivationSchema = require('./schemas/createDerivationSchema')
        const errors = createDerivationSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        appointmentRepository.createDerivableAppointment(req.body.patient_id).then((result) => {
            derivationRepository.createDerivation(result.id,req.body.symptoms).then(() => {
                res.sendStatus(200)
            })
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    updateDerivation(req, res){
        if(req.role !== 'admin') return res.sendStatus(403)
        const updateDerivationSchema = require('./schemas/updateDerivationSchema')
        const errors = updateDerivationSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        derivationRepository.updateDerivation(req.params.id, req.body.admin_id).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getDerivations(req, res){
        if(req.role !== 'admin') return res.sendStatus(403)
        if(req.query.appointment_id){
            derivationRepository.addAppointmentIdFilter(req.query.appointment_id)
        }
        if(req.query.admin_id){
            derivationRepository.addAdminIdFilter(req.query.admin_id)
        }
        const query = derivationRepository.consumeQuery()
        query.then((data) => {
            res.json(data)
        })
    }

}

module.exports = new DerivationController()