const specializationRepository = require('../../repositories/SpecializationRepository');

class SpecializationController{
    getAllSpecializations(req, res){
        specializationRepository.getAll().then((data) => {
            res.json(data)
        })
    }
}

module.exports = new SpecializationController()