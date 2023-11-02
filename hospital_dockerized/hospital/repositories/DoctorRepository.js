const db = require('../utils/DBconnection')

class DoctorRepository{
    createDoctor(user_id, specialization){
        return db.none(`insert into "Doctors" (user_id, specialization)
        values ('${user_id}', '${specialization}');`)
    }

    updateDoctor(id, specialization){
        let updateQuery = `update "Doctors" set specialization = '${specialization}' where user_id=${id};`
        return db.none(updateQuery)
    }

    getDoctorByUserId(id){
        return db.oneOrNone(`select * from "Doctors" where user_id='${id}';`)
    }
}

module.exports = new DoctorRepository()