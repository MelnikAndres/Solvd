const db = require('../utils/DBconnection')

class Specialization{
    getAll(){
        return db.any(`SELECT enum_range(NULL::specialization_type)`)
    }
}

module.exports = new Specialization()