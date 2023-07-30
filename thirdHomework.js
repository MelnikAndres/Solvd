const totalSum = (values, modifier = (value) => value) =>{
    return values.reduce((accumulated, nextValue) => accumulated + modifier(nextValue),0)
}
//task 1
const discountPrice = (price, percentage) =>{
    return price*percentage/100
}
const calculateDiscountedPrice = (products, discount) => {
    return products.map(product => {
        const productCopy = {...product}
        productCopy.price = discountPrice(productCopy.price, discount)
        return productCopy
    })
} 
const calculateTotalPrice = (products) =>{
    return totalSum(products, (product) => product.price)
}
//task 2
const getFullName = (person) =>{
    return capitalizeFirstLetter(person.firstName) + " " + capitalizeFirstLetter(person.lastName)
}

const capitalizeFirstLetter = (name) =>{
    return name[0].toUpperCase() + name.slice(1)
}

const compose = (...functions) =>{
    return (value) => functions.reduce((partialResult, nextFunction) => nextFunction(partialResult), value)
}

const filterUniqueWords = (words) =>{
    return compose(onlyFilter, onlySort)(words)
}

const onlyFilter = (words) =>{
    const filteredWords = new Set(words.split(" "))
    return Array.from(filteredWords)
}
const onlySort = (words) => words.sort()


const calculateStudentAverageGrade = (grades) =>{
    return totalSum(grades)/grades.length
}

const getAverageGrade = (students) =>{
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
const factorial = (n) =>{
    return factorialWithStackReset(n,1n)
}
const MAXREP = 1000n
const factorialWithStackReset = (n,accumulated) =>{
    function recursiveFactorial(repetitions){
        if(n-repetitions<=1n){
            return 1n
        }
        if(repetitions>MAXREP){
            return n-repetitions
        }
        return (n-repetitions) * recursiveFactorial(repetitions+1n)
    }
    const result = recursiveFactorial(0n) * accumulated
    return n<MAXREP?result:factorialWithStackReset(n-(MAXREP+1n),result)
}

const power = (base, exponent) =>{
    if(exponent === 0){
        return 1
    }
    return base * power(base, exponent-1)
}

//task 5

function lazyMap(array, mapFunction){
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