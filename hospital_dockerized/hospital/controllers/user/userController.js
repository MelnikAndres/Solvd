const userRepository = require('../../repositories/UserRepository')
const { isSameUser, isAdmin } = require('../../utils/Authorization')

class UserController {

    getAllUsers(req, res) {
        if (!isAdmin(req.role)) return res.sendStatus(403)
        if (req.query.name) {
            userRepository.addNameFilter(req.query.name)
        }
        if (req.query.role) {
            userRepository.addRoleFilter(req.query.role)
        }
        const query = userRepository.consumeQuery()
        query.then((data) => {
            for (let i = 0; i < data.length; i++) {
                delete data[i].hashed_pass
                delete data[i].token_validator
            }
            res.json(data)
        })
    }

    createAdminUser(req, res) {
        if (!isAdmin(req.role)) return res.sendStatus(403)
        const createAdminUserSchema = require('./schemas/createAdminUserSchema')
        const errors = createAdminUserSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })

        const user = req.body
        userRepository.createUser(user).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getUser(req, res) {
        const userId = +req.params.id

        if (!isAdmin(req.role) && !isSameUser(req.uid, userId)) return res.sendStatus(403)

        userRepository.addIdFilter(userId)
        const query = userRepository.consumeQuery()
        query.then((data) => {
            if (data.length === 0) return res.sendStatus(404)
            const user = data[0]
            delete user.hashed_pass
            delete user.token_validator
            res.json(user)
        })
    }

    updateUser(req, res) {
        const userId = +req.params.id
        if (!isAdmin(req.role) && !isSameUser(req.uid, userId)) return res.sendStatus(403)
        const updateUserSchema = require('./schemas/updateUserSchema')
        const errors = updateUserSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        const user = req.body
        if(!user.name && !user.new_pass) return res.sendStatus(200)
        userRepository.updateUser(userId, user).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    deleteUser(req, res) {
        const userId = +req.params.id
        if (!isAdmin(req.role)) return res.sendStatus(403)

        userRepository.deleteUser(userId).then(() => {
            res.sendStatus(200)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }
}

module.exports = new UserController()