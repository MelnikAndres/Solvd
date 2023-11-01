const express = require('express')
const router = express.Router()

const DerivationController = require('../http/derivation/derivationController')

router.post('/', DerivationController.createDerivation)
router.get('/', DerivationController.getDerivations)
router.put('/:id', DerivationController.updateDerivation)

module.exports = router