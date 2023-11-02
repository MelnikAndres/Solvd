const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment/appointmentController')

router.post('/:specialization', AppointmentController.createAppointment)
router.get('/', AppointmentController.getAppointments)
router.put('/:id', AppointmentController.updateAppointment)

module.exports = router