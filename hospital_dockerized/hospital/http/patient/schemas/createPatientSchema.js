const Schema = require('../../../utils/Schema')
const PROPS = {
    USER_ID: "user_id",
    EMAIL: "email",
    PHONE: "phone"
}
const ERRORS = {
    USER_ID_TYPE: "user_id must be a number",
    USER_ID_REQUIRED: "user_id is required",
    EMAIL_TYPE: "email must be a string",
    PHONE_TYPE: "phone must be a string",
}
const createPatientSchema = new Schema()

createPatientSchema.addValidation(PROPS.USER_ID,
    (user_id) => typeof user_id === 'number',
    ERRORS.USER_ID_TYPE
)
createPatientSchema.addValidation(PROPS.USER_ID,
    (user_id) => !!user_id,
    ERRORS.USER_ID_REQUIRED
)
createPatientSchema.addValidation(PROPS.EMAIL,
    (email) => typeof email === 'string',
    ERRORS.EMAIL_TYPE
)
createPatientSchema.addValidation(PROPS.PHONE,
    (phone) => typeof phone === 'string',
    ERRORS.PHONE_TYPE
)



module.exports = createPatientSchema