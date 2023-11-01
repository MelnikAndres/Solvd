const userModel = require('../../models/User')
const ERRORS = {
    UNKNOWN_USER: 'Unknown user',
    COMPROMISED_TOKEN: 'Compromised token, please login again'
}

function securityMiddleware(req, res, next) {
    if(!req.logged) return next()
    const security_salt = req.sec
    const userId = req.uid
    userModel.addIdFilter(userId)
    const query = userModel.consumeQuery()
    query.then((data) => {
        if (data.length === 0) return res.status(401).json({ errors: [ERRORS.UNKNOWN_USER] })
        const user = data[0]
        console.log(user.token_validator, security_salt)
        if (user.security_salt !== security_salt) return res.status(403).json({ errors: [ERRORS.COMPROMISED_TOKEN] })
        return next()
    })
};

module.exports = securityMiddleware

