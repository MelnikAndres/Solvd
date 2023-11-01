const userModel = require('../../models/User')

class UserController{

    getAllUsers(req, res){
        if(req.role !== 'admin') return res.status(403)
        if(req.query.name){
            userModel.addNameFilter(req.query.name)
        }
        if(req.query.role){
            userModel.addRoleFilter(req.query.role)
        }
        const query = userModel.consumeQuery()
        query.then((data) => {
            for(let i = 0; i < data.length; i++){
                delete data[i].hashed_pass
                delete data[i].token_validator
            }
            res.json(data)
        })
    }

    createUser(req, res){
        if(req.role !== 'admin') return res.status(403)
    
        const createUserSchema = require('./schemas/createUserSchema')
        const errors = createUserSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
    
        const user = req.body
        userModel.createUser(user).then(() => {
            res.sendStatus(201)
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
    }

    getUser(req, res){
        const userId = +req.params.id
        const isAuthorized = req.role === 'admin' || (req.role === 'patient' && userId === req.uid)
        if(isAuthorized){
            userModel.addIdFilter(userId)
            const query = userModel.consumeQuery()
            query.then((data) => {
                if(data.length === 0) return res.sendStatus(404)
                const user = data[0]
                delete user.hashed_pass
                delete user.token_validator
                res.json(user)
            }) 
        }else{
            return res.sendStatus(403)
        }
    }

    updateUser(req, res){
        const userId = +req.params.id
        const isAuthorized = req.role === 'admin' || (req.role === 'patient' && userId === req.uid)
        if(isAuthorized){

            const updateUserSchema = require('./schemas/updateUserSchema')
            const errors = updateUserSchema.validate(req.body)
            if (errors) return res.status(400).json({ errors })

            const user = req.body
            userModel.updateUser(userId, user).then(() => {
                res.sendStatus(200)
            }).catch((err) => {
                res.status(500).json({ errors: [err] })
            })
        }else{
            return res.sendStatus(403)
        }
    }

    deleteUser(req, res){
        const userId = +req.params.id
        const isAuthorized = req.role === 'admin'
        if(isAuthorized){
            userModel.deleteUser(userId).then(() => {
                res.sendStatus(204)
            }).catch((err) => {
                res.status(500).json({ errors: [err] })
            })
        }else{
            return res.sendStatus(403)
        }
    }
}

module.exports = new UserController()