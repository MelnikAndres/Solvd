const Schema = require('../../../utils/Schema')
const PROPS = {
    ADMIN_ID: "admin_id"
}
const ERRORS = {
    ADMIN_ID_TYPE: "admin_id must be a number",
    ADMIN_ID_REQUIRED: "admin_id is required",
}

const updateDerivationSchema = new Schema()

updateDerivationSchema.addValidation(PROPS.ADMIN_ID,
    (admin_id) => typeof admin_id === 'number',
    ERRORS.ADMIN_ID_TYPE
)
updateDerivationSchema.addValidation(PROPS.ADMIN_ID,
    (admin_id) => !!admin_id,
    ERRORS.ADMIN_ID_REQUIRED
)

module.exports = updateDerivationSchema