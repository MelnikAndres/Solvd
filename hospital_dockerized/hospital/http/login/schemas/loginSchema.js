const Schema = require('../../../utils/Schema')
const ERRORS = require('../Errors')
const PROPS = {
    NAME: "name",
    PASSWORD: "password"
}
const loginSchema = new Schema()

loginSchema.addValidation(PROPS.NAME,
    (name) => typeof name === 'string',
    ERRORS.NAME_TYPE
)
loginSchema.addValidation(PROPS.NAME,
    (name) => !!name,
    ERRORS.NAME_REQUIRED
)
loginSchema.addValidation(PROPS.PASSWORD,
    (password) => typeof password === 'string',
    ERRORS.PASSWORD_TYPE
    )
loginSchema.addValidation(PROPS.PASSWORD,
    (password) => !!password,
    ERRORS.PASSWORD_REQUIRED
)

module.exports = loginSchema