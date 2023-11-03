const userRepository = require('../repositories/UserRepository')

class UserService {

    async create(name, password, role) {
        const result = await userRepository.createUser(name, password, role)
        return result.id
    }

    async getUserByNameAndPassword(name, password) {
        userRepository.addNameFilter(name)
        userRepository.addPasswordFilter(password)
        const users = await userRepository.consumeQuery()
        const user = users[0]
        delete user.hashed_pass
        return user
    }

    async updateSalt(id, salt) {
        await userRepository.updateUserSalt(id, salt)
    }

    async getAllUsers(name,role) {
        if (name) userRepository.addNameFilter(name)
        if (role) userRepository.addRoleFilter(role)
        const data = await userRepository.consumeQuery()
        for (let i = 0; i < data.length; i++) {
            delete data[i].hashed_pass
            delete data[i].token_validator
        }
        return data
    }

    async createAdminUser(name, password, role) {
        await userRepository.createUser(name, password, role)
    }

    async getUserById(id) {
        userRepository.addIdFilter(id)
        const data = await userRepository.consumeQuery()
        if (data.length === 0) return null
        const user = data[0]
        delete user.hashed_pass
        return user
    }

    async updateUser(userId, name, new_pass) {
        if (!name && !new_pass) return;
        await userRepository.updateUser(userId, name, new_pass)
    }

    async deleteUser(userId) {
        await userRepository.deleteUser(userId)
    }

    testFunciton(){
        console.log("working?")
    }
}

module.exports = new UserService()