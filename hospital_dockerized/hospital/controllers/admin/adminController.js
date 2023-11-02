const adminRepository = require('../../repositories/AdminRepository');
const userRepository = require('../../repositories/UserRepository');

class AdminController{

    createAdmin(req, res){
        if(req.role !== 'admin') return res.status(403)

        const createAdminSchema = require('./schemas/createAdminSchema')
        const errors = createAdminSchema.validate(req.body)
        if (errors) return res.status(400).json({ errors })
        userRepository.createUser(req.body).then((result) => {
            adminRepository.createAdmin(result.id).then(() => {
                res.sendStatus(200)
            })
        }).catch((err) => {
            res.status(500).json({ errors: [err] })
        })
        
    }
}

module.exports = new AdminController()