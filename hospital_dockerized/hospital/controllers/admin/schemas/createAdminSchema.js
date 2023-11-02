const Schema = require('../../../utils/Schema')
const PROPS = {
    NAME: "name",
    PASSWORD: "password",
    ROLE: "role",
}
const ERRORS = {
    NAME_TYPE: "name must be of type string",
    PASSWORD_TYPE: "password must be of type string",
    NAME_REQUIRED: "name is required",
    PASSWORD_REQUIRED: "password is required",
    ROLE_TYPE: "role must be of type string",
    ROLE_REQUIRED: "role is required",
    ROLE_INVALID: "role is invalid",
}
const createAdminSchema = new Schema()

createAdminSchema.addValidation(PROPS.NAME,
    (name) => typeof name === 'string',
    ERRORS.NAME_TYPE
)
createAdminSchema.addValidation(PROPS.NAME,
    (name) => !!name,
    ERRORS.NAME_REQUIRED
)
createAdminSchema.addValidation(PROPS.PASSWORD,
    (password) => typeof password === 'string',
    ERRORS.PASSWORD_TYPE
    )
createAdminSchema.addValidation(PROPS.PASSWORD,
    (password) => !!password,
    ERRORS.PASSWORD_REQUIRED
)
createAdminSchema.addValidation(PROPS.ROLE,
    (role) => typeof role === 'string',
    ERRORS.ROLE_TYPE
)
createAdminSchema.addValidation(PROPS.ROLE,
    (role) => !!role,
    ERRORS.ROLE_REQUIRED
)
createAdminSchema.addValidation(PROPS.ROLE,
    (role) => role === 'admin',
    ERRORS.ROLE_INVALID
)


module.exports = createAdminSchema
