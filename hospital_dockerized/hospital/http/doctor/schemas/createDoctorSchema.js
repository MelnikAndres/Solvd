`insert into "Doctors" (user_id, specialization)
        values ('${user_id}', '${specialization}');`

const Schema = require('../../../utils/Schema')
const PROPS = {
    USER_ID: "user_id",
    SPECIALIZATION: "specialization"
}
const ERRORS = {
    USER_ID_TYPE: "user_id must be a number",
    USER_ID_REQUIRED: "user_id is required",
    SPECIALIZATION_TYPE: "specialization must be a string",
    SPECIALIZATION_REQUIRED: "specialization is required"
}
const createDoctorSchema = new Schema()

createDoctorSchema.addValidation(PROPS.USER_ID,
    (user_id) => typeof user_id === 'number',
    ERRORS.USER_ID_TYPE
)

createDoctorSchema.addValidation(PROPS.USER_ID,
    (user_id) => !!user_id,
    ERRORS.USER_ID_REQUIRED
)

createDoctorSchema.addValidation(PROPS.SPECIALIZATION,
    (specialization) => typeof specialization === 'string',
    ERRORS.SPECIALIZATION_TYPE
)

createDoctorSchema.addValidation(PROPS.SPECIALIZATION,
    (specialization) => !!specialization,
    ERRORS.SPECIALIZATION_REQUIRED
)


module.exports = createDoctorSchema