const Schema = require('../../../utils/Schema')
const PROPS = {
    SYMPTOMS: "symptoms",
    PATIENT_ID: "patient_id",
}
const ERRORS = {
    SYMPTOMS_TYPE: "symptoms must be a string",
    SYMPTOMS_REQUIRED: "symptoms is required",
    PATIENT_ID_TYPE: "patient_id must be a number",
    PATIENT_ID_REQUIRED: "patient_id is required",
}

const createDerivationSchema = new Schema()

createDerivationSchema.addValidation(PROPS.SYMPTOMS,
    (symptoms) => typeof symptoms === 'string',
    ERRORS.SYMPTOMS_TYPE
)
createDerivationSchema.addValidation(PROPS.SYMPTOMS,
    (symptoms) => !!symptoms,
    ERRORS.SYMPTOMS_REQUIRED
)
createDerivationSchema.addValidation(PROPS.PATIENT_ID,
    (patient_id) => typeof patient_id === 'number',
    ERRORS.PATIENT_ID_TYPE
)
createDerivationSchema.addValidation(PROPS.PATIENT_ID,
    (patient_id) => !!patient_id,
    ERRORS.PATIENT_ID_REQUIRED
)

module.exports = createDerivationSchema