const express = require('express')
const router = express.Router()
const doctorController = require('../http/doctor/doctorController')

router.post('/', doctorController.createDoctor)

module.exports = router