class Schema {
    validations = []

    addValidation(key, isValid, error, binding=false){
        this.validations.push({key, isValid, error, binding})
    }

    validate(toValidate){
        const errors = []
        for(const validation of this.validations){
            if(validation.binding) validation.isValid = validation.isValid.bind(toValidate)
            if(!validation.isValid(toValidate[validation.key])) errors.push(validation.error)
        }
        return errors.length ? errors : null
    }
}


module.exports = Schema