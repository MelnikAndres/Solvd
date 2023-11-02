const db = require('../utils/DBconnection')

class AdminRepository{
    createAdmin(user_id){
        return db.none(`insert into "Admins" (user_id)
        values ('${user_id}');`)
    }
}

module.exports = new AdminRepository()