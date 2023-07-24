const isPrimitive = (value) =>{
    return Object(value) !== value 
}

const canBeAdded = (value) =>{
    if(value === null || value === undefined){
        return false
    }
    return isPrimitive(value)
}

const addValues = (value1, value2) =>{
    if(!canBeAdded(value1) || !canBeAdded(value2)){
        throw new TypeError("Cannot add values of type " + typeof value1 + " and " + typeof value2)
    }
    return value1 + value2
}

const stringifyValue = (value) =>{
    return isPrimitive(value) ? String(value) : JSON.stringify(value)
}

const invertBoolean = (bValue) =>{
    if(typeof bValue === 'boolean'){
        return !bValue
    }
    throw new TypeError("Cannot invert non-boolean type " + typeof bValue)
}

const convertToNumber = (value) =>{
    let result
    if(typeof value === 'string'){
        result = parseInt(value)
    }else{
        result = Number(value)
    }
    if(result === result){
        return result
    }
    throw new TypeError("Cannot convert to number")
}

const coerceToType = (value, newType) =>{
    const types = {string:stringifyValue,number:convertToNumber, bigint:BigInt, boolean:Boolean, symbol:Symbol, object:Object}
    if(types[newType]){
        return types[newType](value)
    }
    throw TypeError("Unknown or invalid type " + newType)
}

class ConversionFollower {
    constructor(value, name){
        this.value = value
        this.name = name
    }
    convertToString(){
        console.log("Converting "+ this.name + " to string with value:")
        const result = this.value?this.value.toString():String(this.value)
        console.log(result)
        return result
    }
    convertToPrimitive(){
        console.log("Converting "+ this.name + " to primitive with value:")
        const result = this.value?this.value.valueOf():this.value
        console.log(result)
        return result
    }
    [Symbol.toPrimitive](hint) {
        if(typeof this.value==='string' && hint==='default'){
            hint='string'
        }
        console.log(this.name + " will be converted to " + hint + " before operating")
        if(isPrimitive(this.value)){
            return this.value
        }
        if (hint === 'string') {
            let result = this.convertToString()
            if(isPrimitive(result)){
                return result
            }
            result = this.convertToPrimitive()
            if(isPrimitive(result)){
                return result
            }
            console.log("Primitive value is of type Object")
            throw TypeError("Couldn't convert "+this.name+" to proper type")
        }
        let result = this.convertToPrimitive()
        if(isPrimitive(result)){
            return result
        }
        console.log("Primitive value is of type Object")
        result = this.convertToString()
        if(isPrimitive(result)){
            return result
        }
        throw TypeError("Couldn't convert "+this.name+" to proper type")
        
    }
    valueOf(){
        return this.value?this.value.valueOf():this.value
    }
    toString(){
        return this.value?this.value.toString():String(this.value)
    }
}

const OPERATIONS = 
    {"+":(v1,v2)=>v1+v2,
    "-":(v1,v2)=>v1-v2,
    "*":(v1,v2)=>v1*v2,
    "/":(v1,v2)=>v1/v2,
    "%":(v1,v2)=>v1%v2,
    "+ +":(v1,v2)=>v1+ +v2}
    
const followOperationConversions = (value1, value2, operation) =>{
    
    const firstValue = new ConversionFollower(value1,"First Value")
    const secondValue = new ConversionFollower(value2,"Second Value")
    if(OPERATIONS[operation]){
        return OPERATIONS[operation](firstValue,secondValue)
    }
    throw Error("Unknown operation "+operation)
}

module.exports={
    addValues,stringifyValue,invertBoolean,convertToNumber,coerceToType,followOperationConversions
}