const Schema = require('../../../utils/Schema')
const PROPS = {
    APPOINTMENT_ID: "appointment_id",
    SYMPTOMS: "symptoms"
}
const ERRORS = {
    APPOINTMENT_ID_TYPE: "appointment_id must be a number",
    APPOINTMENT_ID_REQUIRED: "appointment_id is required",
    SYMPTOMS_TYPE: "symptoms must be a string",
    SYMPTOMS_REQUIRED: "symptoms is required"
}

const createDerivationSchema = new Schema()

createDerivationSchema.addValidation(PROPS.APPOINTMENT_ID,
    (appointment_id) => typeof appointment_id === 'number',
    ERRORS.APPOINTMENT_ID_TYPE
)
createDerivationSchema.addValidation(PROPS.APPOINTMENT_ID,
    (appointment_id) => !!appointment_id,
    ERRORS.APPOINTMENT_ID_REQUIRED
)

createDerivationSchema.addValidation(PROPS.SYMPTOMS,
    (symptoms) => typeof symptoms === 'string',
    ERRORS.SYMPTOMS_TYPE
)
createDerivationSchema.addValidation(PROPS.SYMPTOMS,
    (symptoms) => !!symptoms,
    ERRORS.SYMPTOMS_REQUIRED
)

module.exports = createDerivationSchema