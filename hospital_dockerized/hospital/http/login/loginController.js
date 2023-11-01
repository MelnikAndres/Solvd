const authService = require('../../services/AuthService')
const userModel = require('../../models/User')
const ERRORS = require('./Errors')
const parseExpiration = require('../../utils/parseExpiration')

class LoginController {
    postLogin(req, res) {

        const loginSchema = require('./schemas/loginSchema')
        const errors = loginSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        const name = req.body.name
        const password = req.body.password
        userModel.addNameFilter(name)
        userModel.addPasswordFilter(password)
        const query = userModel.consumeQuery()

        query.then((data) => {
            if (data.length === 0) return res.status(401).json({ errors: [ERRORS.LOGIN_INFO] })
            const user = data[0]
            authService.newSignedToken(user.id, user.role)
                .then((response) => response.json())
                .then((data) => {
                    if (data.errors) return res.status(500).json({ errors: data.errors })
                    const maxAge = parseExpiration(data.expire)
                    return res
                        .cookie("jwt", data.JWT, {
                            httpOnly: true,
                            maxAge: maxAge,
                        }).sendStatus(200)
                })
                .catch((err) => {
                    res.status(500).json({ errors: [err] })
                })
        })
    }

    postLogout(req, res) {
        res.clearCookie('jwt').sendStatus(200)
    }
}
module.exports = new LoginController()