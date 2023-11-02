const Schema = require('../../../utils/Schema')
const ERRORS = {
    NAME_LENGTH: "name must be at least 1 character long",
    PASSWORD_LENGTH: "password must be at least 1 character long",
    PASSWORD_TYPE: "password must be of type string",
    NAME_TYPE: "name must be of type string",
}
const PROPS = {
    NAME: "name",
    NEW_PASSWORD: "new_pass",
}
const updateUserSchema = new Schema()

updateUserSchema.addValidation(PROPS.NAME,
    (name) => typeof name === 'string' || typeof name === 'undefined',
    ERRORS.NAME_TYPE
)
updateUserSchema.addValidation(PROPS.NAME,
    (name) => {
        if(typeof name === 'string'){
            return name.length > 0
        }
        return true
    },
    ERRORS.NAME_LENGTH
)
updateUserSchema.addValidation(PROPS.NEW_PASSWORD,
    (password) => typeof password === 'string' || typeof password === 'undefined',
    ERRORS.PASSWORD_TYPE
    )
updateUserSchema.addValidation(PROPS.NEW_PASSWORD,
    (password) => {
        if(typeof password === 'string'){
            return password.length > 0
        }
        return true
    
    },
    ERRORS.PASSWORD_LENGTH
)


module.exports = updateUserSchema