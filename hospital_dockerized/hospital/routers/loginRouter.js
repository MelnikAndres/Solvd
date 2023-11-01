const express = require('express')
const router = express.Router()
const loginController = require('../http/login/loginController')


router.post('/login', loginController.postLogin)

module.exports = router