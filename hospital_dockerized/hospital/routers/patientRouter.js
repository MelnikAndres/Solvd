const express = require('express')
const router = express.Router()
const patientController = require('../http/patient/patientController')

router.post('/', patientController.createPatient)

module.exports = router