const express = require('express')
const router = express.Router()
const patientController = require('../controllers/patient/patientController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)
router.post('/', patientController.createPatient)
router.put('/:id', patientController.updatePatient)

module.exports = router