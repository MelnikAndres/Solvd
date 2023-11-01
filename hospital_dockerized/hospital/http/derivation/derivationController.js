const derivationModel = require('../../models/Derivation')


class DerivationController{

    createDerivation(req, res){
        const isAuthorized = req.role === 'admin' || req.role === 'patient'
        if(!isAuthorized) return res.status(403)
        const createDerivationSchema = require('./schemas/createDerivationSchema')
        const errors = createDerivationSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        derivationModel.createDerivation(req.body).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    updateDerivation(req, res){
        if(req.role !== 'admin') return res.status(403)

        const updateDerivationSchema = require('./schemas/updateDerivationSchema')
        const errors = updateDerivationSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        derivationModel.updateDerivation(req.params.id, req.body).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getDerivations(req, res){
        if(req.query.appointment_id){
            derivationModel.addAppointmentIdFilter("appointment_id", req.query.appointment_id)
        }
        if(req.query.admin_id){
            derivationModel.addAdminIdFilter("admin_id", req.query.admin_id)
        }
        const query = derivationModel.consumeQuery()
        query.then((data) => {
            res.json(data)
        })
    }

}

module.exports = new DerivationController()