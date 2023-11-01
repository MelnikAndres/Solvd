const appointmentModel = require('../../models/Appointment');

const filters = ["id", "doctor_id", "patient_id", "status"]

class AppointmentController{

    createAppointment(req, res){
        appointmentModel.getLastAppointmentOfDoctorsfromSpecialization(req.params.specialization).then((data) => {
            let closestDate = new Date(8640000000000000)
            let closestDoctor = 0
            for(let i = 0; i < data.length; i++){
                const date = new Date(data[i].last_appointment_date)
                const nextDate = new Date(date.getTime() + (data[i].duration_min * 60 * 1000))
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
                status: 'assigned'
            }
            appointmentModel.createAppointment(appointment).then(() => {
                res.sendStatus(200)
            }).catch((err) => {
                res.status(500).json({ errors: [err] })
            })
        })
    }

    updateAppointment(req, res){
        if(req.role !== 'admin') return res.status(403)

        const updateAppointmentSchema = require('./schemas/updateAppointmentSchema')
        const errors = updateAppointmentSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        appointmentModel.updateAppointment(req.params.id, req.body).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getAppointments(req, res){
        for(let i = 0; i < filters.length; i++){
            if(req.query[filters[i]]){
                appointmentModel.addFilterByName(filters[i], req.query[filters[i]])
            }
        }
        if(req.query.from || req.query.to){
            appointmentModel.addFromToFilter(req.query.from, req.query.to)
        }
        const query = appointmentModel.consumeQuery()
        query.then((data) => {
            res.json(data)
        })
    }

}

module.exports = new AppointmentController()
