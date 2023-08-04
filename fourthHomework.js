//task 1
const person = {firstName: "John",
lastName: "Doe",
age: 30,
email: "john.doe@example.com"}
Object.defineProperties(person, {
    firstName: {writable: false},
    lastName: {writable: false},
    age: {writable: false},
    email: {writable: false}
})
person.updateInfo= function(info) {
    for(let key in info){
        if(this.hasOwnProperty(key)){
            this[key] = info[key]
        }
    }
}
Object.defineProperty(person, "address", {
    value: {},
    writable: true
})
//task 2
const product = {
    name: "Laptop",
    price: 1000,
    quantity: 5
}
Object.defineProperties(product,{
    price:{writable: false, enumerable: false},
    quantity:{writable: false, enumerable: false},
})
const getTotalPrice = (product) =>{
    const price = Object.getOwnPropertyDescriptor(product, "price").value
    const quantity = Object.getOwnPropertyDescriptor(product, "quantity").value
    return price * quantity
}
const deleteNonConfigurable = (object, property) =>{
    if(object.hasOwnProperty(property)){
        if(!Object.getOwnPropertyDescriptor(object, property).configurable){
            throw new Error("Property '"+property+"' is non-configurable")
        }
        delete object[property]
    }
}
//task 3
const bankAccount = {
    _balance:1000,
    get formattedBalance(){
        return '$' + this._balance;
    },
    set balance(amount){
        if(typeof amount !== "number") throw new TypeError("Can't assign non-number value to balance")
        this._balance = amount;
    },
    transfer(targetAccount, amount){
        if(typeof amount !== "number") throw new TypeError("Can't transfer non-number value")
        this._balance -= amount;
        targetAccount._balance += amount;
    }
}
//task 6
const deepCloneObject = (object,propertyModifier = (value)=>{return {value:value, writable:true,enumerable:true,configurable:true}}) =>{
    return _deepCloneObject(object, propertyModifier,new Map())
}
const _deepCloneObject = (object, propertyModifier,cache) =>{
    if(cache.has(object)){return cache.get(object)}
    const objectClone = {}
    cache.set(object, objectClone)
    for(let key in object){
        if(typeof object[key] === "object"){
            Object.defineProperty(objectClone, key, propertyModifier(_deepCloneObject(object[key],propertyModifier,cache)))
        }else{
            Object.defineProperty(objectClone, key, propertyModifier(object[key]))
        }
    }
    return objectClone
}
//task 4
const createImmutableObject = (object) =>{
    const immutableObject = deepCloneObject(object, (value)=>{return {value: value, writable: false, enumerable: true, configurable: true}})
    return immutableObject
}
const immutablePerson = createImmutableObject(person)

//task 5
const observeObject = (object, callback) =>{
    if(typeof object !== "object" || typeof callback !== "function") throw new TypeError("Arguments should be of type (object, function)")
    const handler = {
        get(target, property){
            callback(property, "get")
            return target[property]
        },
        set(target, property, value){
            callback(property, "set")
            target[property] = value
        }
    }
    return new Proxy(object, handler)
}
const observedPerson = observeObject(person, (property, action) =>{ console.log(property, action)})
//task 7
const validateObject = (object, schema) =>{
    for(let key in schema){
        if(!object.hasOwnProperty(key)){
            return false
        }
        if(typeof object[key] !== schema[key].type){
            return false
        }
        for(let ruleKey in schema[key].rules){
            const rule = schema[key].rules[ruleKey]
            if(!rule(object[key])){
                return false
            }
        }
    }
    return true
}
/*
const SchemaExample = 
    {firstName: {type: "string", rules: {notEmpty:(value)=>value.length > 0}},
    lastName: {type: "string"},
    age: {type: "number", rules: {isPositive:(value)=>value > 0}},
    email: {type: "string", rules: {isEmail:(value)=>value.includes("@")}}}
*/