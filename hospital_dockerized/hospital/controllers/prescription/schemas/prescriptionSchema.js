const Schema = require('../../../utils/Schema')
const PROPS = {
    APPO_ID: "appointment_id",
    PATIENT_ID: "patient_id",
    INFO: "info",
    MEDICINE: "medicine"
}
const ERRORS = {
    APPO_ID_TYPE: "appointment_id must be a number",
    APPO_ID_REQUIRED: "appointment_id is required",
    PATIENT_ID_TYPE: "patient_id must be a number",
    PATIENT_ID_REQUIRED: "patient_id is required",
    INFO_TYPE: "info must be a string",
    INFO_REQUIRED: "info is required",
    MEDICINE_TYPE: "medicine must be a string",
    MEDICINE_REQUIRED: "medicine is required"
}
const prescriptionSchema = new Schema()

prescriptionSchema.addValidation(PROPS.APPO_ID,
    (appointment_id) => typeof appointment_id === 'number',
    ERRORS.APPO_ID_TYPE
)
prescriptionSchema.addValidation(PROPS.APPO_ID,
    (appointment_id) => !!appointment_id,
    ERRORS.APPO_ID_REQUIRED
)
prescriptionSchema.addValidation(PROPS.PATIENT_ID,
    (patient_id) => typeof patient_id === 'number',
    ERRORS.PATIENT_ID_TYPE
)
prescriptionSchema.addValidation(PROPS.PATIENT_ID,
    (patient_id) => !!patient_id,
    ERRORS.PATIENT_ID_REQUIRED
)
prescriptionSchema.addValidation(PROPS.INFO,
    (info) => typeof info === 'string',
    ERRORS.INFO_TYPE
)
prescriptionSchema.addValidation(PROPS.INFO,
    (info) => !!info,
    ERRORS.INFO_REQUIRED
)
prescriptionSchema.addValidation(PROPS.MEDICINE,
    (medicine) => typeof medicine === 'string',
    ERRORS.MEDICINE_TYPE
)
prescriptionSchema.addValidation(PROPS.MEDICINE,
    (medicine) => !!medicine,
    ERRORS.MEDICINE_REQUIRED
)


module.exports = prescriptionSchema