const authService = require('../../services/AuthService')
const userRepository = require('../../repositories/UserRepository')
const parseExpiration = require('../../utils/parseExpiration')
const ERROR_LOGIN_INFO = "Wrong name or password"
const JWT_COOKIE_NAME = "jwt"

class LoginController {
    postLogin(req, res) {
        if(req.logged) return res.status(400).json({ errors: [ERROR_LOGIN_INFO] })
        const loginSchema = require('./schemas/loginSchema')
        const errors = loginSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        const name = req.body.name
        const password = req.body.password
        userRepository.addNameFilter(name)
        userRepository.addPasswordFilter(password)
        const query = userRepository.consumeQuery()
        query.then((data) => {
            if (data.length === 0) return res.status(400).json({ errors: [ERROR_LOGIN_INFO] })
            const user = data[0]
            authService.newSignedToken(user.id, user.role)
                .then((response) => response.json())
                .then((data) => {
                    if (data.errors) return res.status(500).json({ errors: data.errors })
                    const maxAge = parseExpiration(data.expire)
                    const salt = data.salt
                    userRepository.updateUserSalt(user.id, salt).then(() => {
                        return res
                        .cookie(JWT_COOKIE_NAME, data.JWT, {
                            httpOnly: true,
                            maxAge: maxAge,
                        }).sendStatus(200)
                    })
                })
                .catch((err) => {
                    res.status(500).json({ errors: [err] })
                })
        })
    }

    postLogout(req, res) {
        res.clearCookie(JWT_COOKIE_NAME).sendStatus(200)
    }
}
module.exports = new LoginController()