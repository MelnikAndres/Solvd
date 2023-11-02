const {Filterable, Filter} = require('../utils/Filterable')
const db = require('../utils/DBconnection')

class UserRepository extends Filterable{
    constructor(){
        super('"Users"')
    }
    addNameFilter(name, compare = "="){
        const filter = new Filter("name", compare, name)
        this.addFilter(filter)
    }

    addRoleFilter(role, compare = "="){
        const filter = new Filter("role", compare, role)
        this.addFilter(filter)
    }

    addPasswordFilter(password, compare = "="){
        const filter = new Filter("hashed_pass", compare, password)
        this.addFilter(filter)
    }

    addIdFilter(id, compare = "="){
        const filter = new Filter("id", compare, id)
        this.addFilter(filter)
    }

    updateUser(userid, user){
        let updateQuery = `update "Users" set `
        if(user.name) updateQuery += `name='${user.name}'`
        if(user.new_pass) updateQuery += (user.name? ", ": "") +`hashed_pass='${user.new_pass}'`
        updateQuery += ` where id=${userid};`
        return db.none(updateQuery)
    }

    updateUserSalt(userid, salt){
        const updateQuery = `update "Users" set token_validator='${salt}' where id=${userid};`
        return db.none(updateQuery)
    }

    deleteUser(userid){
        const deleteQuery = `delete from "Users" where id=${userid};`
        return db.none(deleteQuery)
    }

    createUser(user){
        const insertQuery = `insert into "Users" (name, hashed_pass, role, token_validator,created_at)
        values ('${user.name}', '${user.password}', '${user.role}', null, NOW()) RETURNING ID;`
        return db.oneOrNone(insertQuery)
    }

}

module.exports = new UserRepository()