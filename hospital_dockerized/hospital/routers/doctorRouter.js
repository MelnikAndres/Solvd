const express = require('express')
const router = express.Router()
const doctorController = require('../controllers/doctor/doctorController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)

router.post('/', doctorController.createDoctor)

module.exports = router