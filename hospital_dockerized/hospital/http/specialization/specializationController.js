const specializationModel = require('../../models/Specialization');

class SpecializationController{
    getAllSpecializations(req, res){
        specializationModel.getAll().then((data) => {
            res.json(data)
        })
    }
}

module.exports = new SpecializationController()