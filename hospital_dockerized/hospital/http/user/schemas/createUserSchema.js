const Schema = require('../../../utils/Schema')
const ERRORS = require('../Errors')
const PROPS = {
    NAME: "name",
    PASSWORD: "password",
    ROLE: "role"
}
const ROLES = ["admin", "doctor", "patient"]
const createUserSchema = new Schema()

createUserSchema.addValidation(PROPS.NAME,
    (name) => typeof name === 'string',
    ERRORS.NAME_TYPE
)
createUserSchema.addValidation(PROPS.NAME,
    (name) => !!name,
    ERRORS.NAME_REQUIRED
)
createUserSchema.addValidation(PROPS.PASSWORD,
    (password) => typeof password === 'string',
    ERRORS.PASSWORD_TYPE
    )
createUserSchema.addValidation(PROPS.PASSWORD,
    (password) => !!password,
    ERRORS.PASSWORD_REQUIRED
)
createUserSchema.addValidation(PROPS.ROLE,
    (role) => typeof role === 'string',
    ERRORS.ROLE_TYPE
)
createUserSchema.addValidation(PROPS.ROLE,
    (role) => !!role,
    ERRORS.ROLE_REQUIRED
)
createUserSchema.addValidation(PROPS.ROLE,
    (role) => ROLES.includes(role),
    ERRORS.ROLE_INVALID
)


module.exports = createUserSchema