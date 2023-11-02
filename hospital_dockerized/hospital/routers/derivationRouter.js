const express = require('express')
const router = express.Router()

const derivationController = require('../controllers/derivation/derivationController')

router.post('/', derivationController.createDerivation)
router.get('/', derivationController.getDerivations)
router.put('/:id', derivationController.updateDerivation)

module.exports = router