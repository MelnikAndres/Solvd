const Schema = require('../../../utils/Schema')
const ERRORS = require('../Errors')
const PROPS = {
    NAME: "name",
    NEW_PASSWORD: "new_pass",
}
const createUserSchema = new Schema()

createUserSchema.addValidation(PROPS.NAME,
    (name) => typeof name === 'string' || typeof name === 'undefined',
    ERRORS.NAME_TYPE
)
createUserSchema.addValidation(PROPS.NAME,
    (name) => {
        if(typeof name === 'string'){
            return name.length > 0
        }
        return true
    },
    ERRORS.NAME_LENGTH
)
createUserSchema.addValidation(PROPS.NEW_PASSWORD,
    (password) => typeof password === 'string' || typeof password === 'undefined',
    ERRORS.PASSWORD_TYPE
    )
createUserSchema.addValidation(PROPS.NEW_PASSWORD,
    (password) => {
        if(typeof password === 'string'){
            return password.length > 0
        }
        return true
    
    },
    ERRORS.PASSWORD_LENGTH
)


module.exports = createUserSchema