const totalSum = (values, modifier = (value) => value) =>{
    return values.reduce((accumulated, nextValue) => accumulated + modifier(nextValue),0)
}
//task 1
const discountPrice = (price, percentage) =>{
    return price - price*percentage/100
}
const calculateDiscountedPrice = (products, discount) => {
    if(!Array.isArray(products) || typeof discount !== "number"){
        throw new TypeError("Arguments should be of type (array, number)")
    }
    return products.map(product => {
        const productCopy = {...product}
        productCopy.price = discountPrice(productCopy.price, discount)
        return productCopy
    })
} 
const calculateTotalPrice = (products) =>{
    if(!Array.isArray(products)){
        throw new TypeError("Argument is not an array")
    }
    return totalSum(products, (product) => product.price)
}
//task 2
const capitalizeFirstLetter = (name) =>{
    return name[0].toUpperCase() + name.slice(1)
}

const getFullName = (person) =>{
    if(!person || typeof person.firstName !== "string" || typeof person.lastName !== "string"){
        throw new TypeError("Argument is not a valid person object")
    }
    return capitalizeFirstLetter(person.firstName) + " " + capitalizeFirstLetter(person.lastName)
}

const compose = (...functions) =>{
    return (value) => functions.reduce((partialResult, nextFunction) => nextFunction(partialResult), value)
}

const toLowerCaseAndSplit = (words) => words.toLowerCase().split(" ")

const removeNonWords = (words) => words.filter((word) => word.replace(/\W/g, ''))

const onlyFilter = (words) =>{
    const result = new Set(words)
    return Array.from(result)
}
const onlySort = (words) => words.sort((a,b) =>a.toLowerCase().localeCompare(b.toLowerCase()))

const filterUniqueWords = (words) =>{
    if(typeof words !== "string"){
        throw new TypeError("Argument is not a string")
    }
    return compose(toLowerCaseAndSplit, removeNonWords, onlyFilter, onlySort)(words)
}

const calculateStudentAverageGrade = (grades) =>{
    return totalSum(grades)/grades.length
}

const getAverageGrade = (students) =>{
    if(!Array.isArray(students)){
        throw new TypeError("Argument is not an array")
    }
    return totalSum(students, (student) => calculateStudentAverageGrade(student.grades))/students.length
}
//task 3
const createCounter = () =>{
    let counter = 0;
    return () =>{
        return counter++ //starts from 0
    }
}

const repeatFunction = (repeatableFunc, times) =>{
    if(typeof repeatableFunc !== "function" || typeof times !== "number"){
        throw new TypeError("Arguments should be of type (function, number)")
    }
    return () =>{
        const timesCounter = createCounter();
        ;(function repeat(){
            if(timesCounter()<times || times<0){
                repeatableFunc()
                repeat()
            }
        })()
    }
}
//task 4
const MAXREP = 1000
const factorialWithStackReset = (n,accumulated) =>{
    function recursiveFactorial(repetitions){
        if(n-repetitions<=1){
            return 1
        }
        if(repetitions>MAXREP){
            return n-repetitions
        }
        return (n-repetitions) * recursiveFactorial(repetitions+1)
    }
    const result = recursiveFactorial(0) * accumulated
    return n<MAXREP?result:factorialWithStackReset(n-(MAXREP+1),result)
}
const factorial = (n) =>{
    if(typeof n !== "number"){
        throw new TypeError("Argument is not a number")
    }
    return factorialWithStackReset(n,1)
}


const power = (base, exponent) =>{
    if(typeof base !== "number" || typeof exponent !== "number"){
        throw new TypeError("Arguments should be of type (number, number)")
    }
    if(exponent === 0){
        return 1
    }
    return base * power(base, exponent-1)
}
//task 5

function lazyMap(array, mapFunction){
    if(!Array.isArray(array) || typeof mapFunction !== "function"){
        throw new TypeError("Arguments should be of type (array, function)")
    }
    const counter = createCounter()
    return {
        next: () =>{
            const index = counter()
            if(index<array.length){
                return {value: mapFunction(array[index]), done: false}
            }
            return {done: true}
        }
    }
}
const lazyFibonacci = () =>{
    let last = 0
    let current = 0
    return {
        next: function(){
            this.next = function(){
                const next = current?last + current:1;
                last = current
                current = next
                return {value: current, done: false}
            }
        return {value: 0, done: false}
    }
}
}