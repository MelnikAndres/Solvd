require('dotenv').config()
const basicJWT = require('../utils/basicJWT')
const express = require('express')
const router = express.Router()
const NO_TOKEN_ERROR = 'No token provided'
const NO_PAYLOAD_ERROR = 'No payload provided'
const SERVICE_ONLINE_MSG = 'JWT service is online'

router.get('/', function(req, res){
    res.status(200).send(SERVICE_ONLINE_MSG)
})

router.post('/sign', function(req, res){
    const payload = req.body.payload
    if (!payload) return res.status(400).json({ errors: [NO_PAYLOAD_ERROR] })
    const errors = basicJWT.verifyPayload(payload)
    if (errors) return res.status(400).json({ errors })
    const token = basicJWT.createJWT(payload, process.env.SECRET_KEY)
    res.status(200).json({ JWT: token })
})
router.post('/verify', function(req, res){
    const token = req.headers.authorization
    if (!token) return res.status(400).json({ errors: [NO_TOKEN_ERROR] })
    const error = basicJWT.verifyJWT(token, process.env.SECRET_KEY)
    if (error) return res.status(403).json({ errors: error })
    const payload = basicJWT.decodeJWT(token)
    res.status(200).json(payload)
})

module.exports = router