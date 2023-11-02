const Schema = require('../../../utils/Schema')
const PROPS = {
    SPECIALIZATION: "specialization",  
}
const ERRORS = {
    SPECIALIZATION_TYPE: "specialization must be a string",
    SPECIALIZATION_REQUIRED: "specialization is required"
}
const updateDoctorSchema = new Schema()

updateDoctorSchema.addValidation(PROPS.SPECIALIZATION,
    (specialization) => typeof specialization === 'string',
    ERRORS.SPECIALIZATION_TYPE
)

updateDoctorSchema.addValidation(PROPS.SPECIALIZATION,
    (specialization) => !!specialization,
    ERRORS.SPECIALIZATION_REQUIRED
)

module.exports = updateDoctorSchema
