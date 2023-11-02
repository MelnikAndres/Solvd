const Schema = require('../../../utils/Schema')
const PROPS = {
    INFO: "info",
    MEDICINE: "medicine"
}
const ERRORS = {
    INFO_TYPE: "info must be a string",
    MEDICINE_TYPE: "medicine must be a string"
}
const updatePrescriptionSchema = new Schema()

updatePrescriptionSchema.addValidation(PROPS.INFO,
    (info) => !info || typeof info === 'string',
    ERRORS.INFO_TYPE
)
updatePrescriptionSchema.addValidation(PROPS.MEDICINE,
    (medicine) => !medicine || typeof medicine === 'string',
    ERRORS.MEDICINE_TYPE
)


module.exports = updatePrescriptionSchema