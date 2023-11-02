const userRepository = require('../repositories/userRepository')
const ERRORS = {
    UNKNOWN_USER: 'Unknown user',
    COMPROMISED_TOKEN: 'Compromised token, please login again'
}

function securityMiddleware(req, res, next) {
    if(!req.logged) return next()
    const security_salt = req.sec
    const userId = req.uid
    userRepository.addIdFilter(userId)
    const query = userRepository.consumeQuery()
    query.then((data) => {
        if (data.length === 0) return res.status(400).json({ errors: [ERRORS.UNKNOWN_USER] })
        const user = data[0]
        if (user.token_validator !== security_salt) return res.status(403).json({ errors: [ERRORS.COMPROMISED_TOKEN] })
        return next()
    })
};

module.exports = securityMiddleware

