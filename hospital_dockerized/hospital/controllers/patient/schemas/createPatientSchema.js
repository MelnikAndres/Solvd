const Schema = require('../../../utils/Schema')
const PROPS = {
    EMAIL: "email",
    PHONE: "phone",
    NAME: "name",
    PASSWORD: "password",
    ROLE: "role"
}
const ERRORS = {
    EMAIL_TYPE: "email must be a string",
    PHONE_TYPE: "phone must be a string",
    NAME_TYPE: "name must be of type string",
    PASSWORD_TYPE: "password must be of type string",
    NAME_REQUIRED: "name is required",
    PASSWORD_REQUIRED: "password is required",
    ROLE_TYPE: "role must be of type string",
    ROLE_REQUIRED: "role is required",
    ROLE_INVALID: "role is invalid",
}
const createPatientSchema = new Schema()

createPatientSchema.addValidation(PROPS.EMAIL,
    (email) => !email || typeof email === 'string',
    ERRORS.EMAIL_TYPE
)
createPatientSchema.addValidation(PROPS.PHONE,
    (phone) => !phone || typeof phone === 'string',
    ERRORS.PHONE_TYPE
)

createPatientSchema.addValidation(PROPS.NAME,
    (name) => typeof name === 'string',
    ERRORS.NAME_TYPE
)
createPatientSchema.addValidation(PROPS.NAME,
    (name) => !!name,
    ERRORS.NAME_REQUIRED
)
createPatientSchema.addValidation(PROPS.PASSWORD,
    (password) => typeof password === 'string',
    ERRORS.PASSWORD_TYPE
    )
createPatientSchema.addValidation(PROPS.PASSWORD,
    (password) => !!password,
    ERRORS.PASSWORD_REQUIRED
)
createPatientSchema.addValidation(PROPS.ROLE,
    (role) => typeof role === 'string',
    ERRORS.ROLE_TYPE
)
createPatientSchema.addValidation(PROPS.ROLE,
    (role) => !!role,
    ERRORS.ROLE_REQUIRED
)
createPatientSchema.addValidation(PROPS.ROLE,
    (role) => role === 'patient',
    ERRORS.ROLE_INVALID
)


module.exports = createPatientSchema