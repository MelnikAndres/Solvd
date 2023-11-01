const express = require('express')
const router = express.Router()

const AppointmentController = require('../http/appointment/appointmentController')

router.post('/', AppointmentController.createAppointment)
router.get('/', AppointmentController.getAppointments)
router.put('/:id', AppointmentController.updateAppointment)

module.exports = router