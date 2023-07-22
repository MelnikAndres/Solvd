//addValues: Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. 
//The function should return the result of the addition. If the addition is not possible, it should throw an error.

const canBeAdded = (value) =>{
    if(value === null){
        return false;
    }
    return Object(value.valueOf()) !== value.valueOf() ;
}

const addValues = (arg1, arg2,arg3) =>{
    console.log("Test " + arg3)
    if(!canBeAdded(arg1) || !canBeAdded(arg2)){
    }
    throw "TypeError: Cannot add values of type " + typeof arg1 + " and " + typeof arg2
}

addValues(null,1,"null")
addValues("1",1,"string")
addValues("hola",1,"mixstring")
addValues(true,1,"boolean")
addValues(2,1,"number")
//addValues(Symbol('foo'),"symbol")
addValues(10n,1n,"bigint")
addValues({},1,"object")
addValues([],1,"array")
function MyCustomType(n) {
    this.number = n;
}
  
MyCustomType.prototype.valueOf = function() {
return this.number;
};
addValues(new MyCustomType(4),1,"custom type")