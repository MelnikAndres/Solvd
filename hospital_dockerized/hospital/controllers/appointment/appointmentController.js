const appointmentRepository = require('../../repositories/AppointmentRepository');
const {isAdmin,isSameUser} = require('../../utils/Authorization')
const {ID, DOCTOR_ID, PATIENT_ID, STATUS} = require('../../utils/CommonProps')
const FILTERS = [ID, DOCTOR_ID, PATIENT_ID, STATUS]

class AppointmentController{

    createAppointment(req, res){
        if(!isAdmin(req.role) && !isSameUser(req.uid,req.body.user_id)) return res.sendStatus(403)

        const createAppointmentSchema = require('./schemas/createAppointmentSchema')
        const errors = createAppointmentSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        if(!req.body.specialization){
            req.body.specialization = 'general'
        }

        appointmentRepository.getLastAppointmentOfDoctorsfromSpecialization(req.body.specialization).then((data) => {
            let closestDate = new Date(8640000000000000)
            let closestDoctor = 0
            for(let i = 0; i < data.length; i++){
                const date = new Date(data[i].last_appointment_date||Date.now())
                const duration = data[i].duration_min || 60
                const nextDate = new Date(date.getTime() + (duration * 60 * 1000))
                if(nextDate < closestDate){
                    closestDate = nextDate
                    closestDoctor = data[i].doctor_id
                }
            }
            const appointment = {
                doctor_id: closestDoctor,
                patient_id: req.body.patient_id,
                date: closestDate.getTime(),
                duration_min: 60,
                symptoms: req.body.symptoms,
                status: 'assigned'
            }
            appointmentRepository.createAppointment(appointment).then(() => {
                res.sendStatus(200)
            }).catch((err) => {
                res.status(500).json({ errors: [err] })
            })
        })
    }

    updateAppointment(req, res){
        if(!isAdmin(req.role)) return res.status(403)

        if(!req.body.status) return res.sendStatus(200)

        appointmentRepository.updateAppointment(req.params.id, req.body.status).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getAppointments(req, res){
        if(!req.logged) return res.sendStatus(403)
        for(let i = 0; i < FILTERS.length; i++){
            if(req.query[FILTERS[i]]){
                appointmentRepository.addFilterByName(FILTERS[i], req.query[FILTERS[i]])
            }
        }
        if(req.query.from || req.query.to){
            appointmentRepository.addFromToFilter(req.query.from, req.query.to)
        }
        const query = appointmentRepository.consumeQuery()
        query.then((data) => {
            res.json(data)
        })
    }

    deleteAppointment(req, res){
        if(!isAdmin(req.role)) return res.status(403)
        appointmentRepository.deleteAppointment(req.params.id).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

}

module.exports = new AppointmentController()
