const db = require('../utils/DBconnection')

class DoctorRepository{
    createDoctor(user_id, specialization){
        return db.none(`insert into "Doctors" (user_id, specialization)
        values ('${user_id}', '${specialization}');`)
    }
}

module.exports = new DoctorRepository()