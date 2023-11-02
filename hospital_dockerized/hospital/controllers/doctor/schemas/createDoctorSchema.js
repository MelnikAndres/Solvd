const Schema = require('../../../utils/Schema')
const PROPS = {
    SPECIALIZATION: "specialization",
    NAME: "name",
    PASSWORD: "password",
    ROLE: "role",
    
}
const ERRORS = {
    SPECIALIZATION_TYPE: "specialization must be a string",
    SPECIALIZATION_REQUIRED: "specialization is required",
    NAME_TYPE: "name must be of type string",
    PASSWORD_TYPE: "password must be of type string",
    NAME_REQUIRED: "name is required",
    PASSWORD_REQUIRED: "password is required",
    ROLE_TYPE: "role must be of type string",
    ROLE_REQUIRED: "role is required",
    ROLE_INVALID: "role is invalid",
}
const createDoctorSchema = new Schema()

createDoctorSchema.addValidation(PROPS.SPECIALIZATION,
    (specialization) => typeof specialization === 'string',
    ERRORS.SPECIALIZATION_TYPE
)

createDoctorSchema.addValidation(PROPS.SPECIALIZATION,
    (specialization) => !!specialization,
    ERRORS.SPECIALIZATION_REQUIRED
)

createDoctorSchema.addValidation(PROPS.NAME,
    (name) => typeof name === 'string',
    ERRORS.NAME_TYPE
)
createDoctorSchema.addValidation(PROPS.NAME,
    (name) => !!name,
    ERRORS.NAME_REQUIRED
)
createDoctorSchema.addValidation(PROPS.PASSWORD,
    (password) => typeof password === 'string',
    ERRORS.PASSWORD_TYPE
    )
createDoctorSchema.addValidation(PROPS.PASSWORD,
    (password) => !!password,
    ERRORS.PASSWORD_REQUIRED
)
createDoctorSchema.addValidation(PROPS.ROLE,
    (role) => typeof role === 'string',
    ERRORS.ROLE_TYPE
)
createDoctorSchema.addValidation(PROPS.ROLE,
    (role) => !!role,
    ERRORS.ROLE_REQUIRED
)
createDoctorSchema.addValidation(PROPS.ROLE,
    (role) => role === 'doctor',
    ERRORS.ROLE_INVALID
)


module.exports = createDoctorSchema
