const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin/adminController')
const passHashingMiddleware = require('../middleware/passHashingMiddleware')

router.use(passHashingMiddleware)
router.post('/', adminController.createAdmin)

module.exports = router