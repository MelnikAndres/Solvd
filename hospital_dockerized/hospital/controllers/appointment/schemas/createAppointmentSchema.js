const Schema = require('../../../utils/Schema')
const PROPS = {
    PATIENT_ID: "patient_id",
    SYMPTOMS: "symptoms",
    SPECIALIZATION: "specialization"
}
const ERRORS = {
    PATIENT_ID_TYPE: "doctor_id must be a number",
    SYMPTOMS_TYPE: "symptoms must be a string",
    PATIENT_ID_REQUIRED: "patient_id is required",
    SPECIALIZATION_TYPE: "specialization must be a string"
}

const createAppointmentSchema = new Schema()

createAppointmentSchema.addValidation(PROPS.PATIENT_ID,
    (patient_id) => typeof patient_id === 'number',
    ERRORS.PATIENT_ID_TYPE
)

createAppointmentSchema.addValidation(PROPS.SYMPTOMS,
    (symptoms) => !symptoms || typeof symptoms === 'string',
    ERRORS.SYMPTOMS_TYPE
)

createAppointmentSchema.addValidation(PROPS.PATIENT_ID,
    (patient_id) => !!patient_id,
    ERRORS.PATIENT_ID_REQUIRED
)

createAppointmentSchema.addValidation(PROPS.SPECIALIZATION,
    (specialization) => !specialization || typeof specialization === 'string',
    ERRORS.SPECIALIZATION_TYPE
)

module.exports = createAppointmentSchema