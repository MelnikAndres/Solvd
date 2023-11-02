const express = require('express')
const router = express.Router()
const prescriptionController = require('../controllers/prescription/prescriptionController')

router.post('/', prescriptionController.createPrescription)
router.get('/:id', prescriptionController.getPrescriptionsByPatientId)

module.exports = router