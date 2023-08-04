//task 1
const customFilterUnique = (array, callback) => {
    if(!Array.isArray(array) || typeof callback !== "function") throw new TypeError("Arguments must be of type (array,function)")
    const uniques = new Map()
    array.forEach(element => {
        const uniqueIdentifier = callback(element)
        if(!uniques.has(uniqueIdentifier)){
            uniques.set(uniqueIdentifier, element)
        }
    })
    return [...uniques.values()]
}
const arr = [{name: "John", age: 30}, {name: "Jane", age: 30}, {name: "John", age: 30}]
const arrFiltered = customFilterUnique(arr, (element) => element.name)
//task 2
const chunkArrayUnoptimized = (array, chunkSize) => {
    if(chunkSize <= 0) throw new Error("Chunk size must be greater than 0")
    if(typeof chunkSize !== "number" || !Array.isArray(array)) throw new TypeError("Arguments must be of type (array,number)")
    const chunkedArray = []
    for(let i = 0; i < array.length; i+=chunkSize){
        chunkedArray.push(array.slice(i, i + chunkSize))
    }
    return chunkedArray;
}

const chunkArray = (array, chunkSize) => {
    if(chunkSize <= 0) throw new Error("Chunk size must be greater than 0")
    if(typeof chunkSize !== "number" || !Array.isArray(array)) throw new TypeError("Arguments must be of type (array,number)")
    const rest = array.length>chunkSize?array.length % chunkSize:array.length
    const maxChunks = ~~(array.length/chunkSize)
    for(let i = 0; i < maxChunks; i++){
        array.splice(i, chunkSize, array.slice(i, i + chunkSize))        
    }
    if(rest){
        array.splice(array.length - rest, rest, array.slice(array.length - rest))
    }
    
}
//task 3
const swap = (array, index1, index2) => {
    [array[index1],array[index2]] = [array[index2],array[index1]]
}
const unefficientCustomShuffle = (array) => {
    if(!Array.isArray(array)) throw new TypeError("Argument must be of type (array)")
    const shuffledArray = Array.from(array)
    for(let i = 0; i< array.length;i++){
        const randomIndex1 = Math.floor(Math.random() * array.length)
        const randomIndex2 = Math.floor(Math.random() * array.length)
        swap(shuffledArray, randomIndex1, randomIndex2)
    }
    return shuffledArray;
}

//Fisher–Yates shuffle
const customShuffle = (array) => {
    if(!Array.isArray(array)) throw new TypeError("Argument must be of type (array)")
    const shuffledArray = Array.from(array)
    for(let i = array.length-1; i>0;i--){
        const randomIndex = Math.floor(Math.random() * (i+1))
        swap(shuffledArray, i, randomIndex)
    }
    return shuffledArray;
}

//task 4
const getArrayIntersection = (array1, array2) => {
    if(!Array.isArray(array1) || !Array.isArray(array2)) throw new TypeError("Arguments must be of type (array,array)")
    const result = []
    const setToSearch = new Set(array1)
    array2.forEach(element => {if(setToSearch.has(element))result.push(element)})
    return result
}

const getArrayUnion = (array1, array2) => {
    if(!Array.isArray(array1) || !Array.isArray(array2)) throw new TypeError("Arguments must be of type (array,array)")
    return Array.from(new Set([...array1, ...array2]))
}

//task 5
const measureArrayPerformance = (callback, array) => {
    if(typeof callback !== "function" || !Array.isArray(array)) throw new TypeError("Arguments must be of type (function,array)")
    const start = process.hrtime.bigint()
    callback(array)
    const end = process.hrtime.bigint()
    return end - start
}

/* ----- More accurate but slower -----
const measureAveragePerformance = (funcToMeasure) =>{
    const measuredTime = []
    for(let i = 0; i< 100; i++){
        const array = Array.from({length: 1000000}, (_, i) => i + 1)
        measuredTime.push(measureArrayPerformance(funcToMeasure, array))
    }
    return measuredTime.reduce((acc, curr) => acc + curr, 0n)/BigInt(measuredTime.length)
}
*/