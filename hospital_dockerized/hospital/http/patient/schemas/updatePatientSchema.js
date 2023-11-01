const Schema = require('../../../utils/Schema')
const PROPS = {
    EMAIL: "email",
    PHONE: "phone"
}
const ERRORS = {
    EMAIL_TYPE: "email must be a string",
    PHONE_TYPE: "phone must be a string",
}
const updatePatientSchema = new Schema()

updatePatientSchema.addValidation(PROPS.EMAIL,
    (email) => typeof email === 'string',
    ERRORS.EMAIL_TYPE
)
updatePatientSchema.addValidation(PROPS.PHONE,
    (phone) => typeof phone === 'string',
    ERRORS.PHONE_TYPE
)

module.exports = updatePatientSchema