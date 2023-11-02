const Schema = require('../../../utils/Schema')
const PROPS = {
    DOCTOR_ID: "doctor_id",
    STATUS: "status",
}
const ERRORS = {
    DOCTOR_ID_TYPE: "doctor_id must be a number",
    STATUS_TYPE: "status must be a string",
    STATUS_REQUIRED: "status is required",
}

const updateAppointmentSchema = new Schema()

updateAppointmentSchema.addValidation(PROPS.DOCTOR_ID,
    (doctor_id) => !doctor_id || typeof doctor_id === 'number',
    ERRORS.DOCTOR_ID_TYPE
)
updateAppointmentSchema.addValidation(PROPS.STATUS,
    (status) => typeof status === 'string',
    ERRORS.STATUS_TYPE
)
updateAppointmentSchema.addValidation(PROPS.STATUS,
    (status) => !!status,
    ERRORS.STATUS_REQUIRED
)

module.exports = updateAppointmentSchema