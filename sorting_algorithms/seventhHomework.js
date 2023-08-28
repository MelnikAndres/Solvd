const swap = (toSwap, index1, index2) => {
    const temp = toSwap[index1]
    toSwap[index1] = toSwap[index2]
    toSwap[index2] = temp
    //[toSwap[index1],toSwap[index2]] = [toSwap[index2],toSwap[index1]] is slower
}
const bubbleSort = (toSort) =>{
    let ordering = true
    while(ordering){
        ordering = false
        for(let i = toSort.length-1; i>0;i--){
            if(toSort[i]<toSort[i-1]){
                swap(toSort,i,i-1)
                ordering = true
            }
        }
    }
}
const mergeSort =(toSort) =>{
    if(toSort.length<=1){
        return toSort
    }
    const mid = Math.floor(toSort.length/2)
    const leftOrdered = mergeSort(toSort.slice(0,mid))
    const rightOrdered = mergeSort(toSort.slice(mid))
    let leftI = 0
    let rightI = 0
    const result = []
    while(leftI<leftOrdered.length || rightI<rightOrdered.length){
        if(leftI>=leftOrdered.length || leftOrdered[leftI]>rightOrdered[rightI]){
            result.push(rightOrdered[rightI++])
        }else{
            result.push(leftOrdered[leftI++])
        }
    }
    return result;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const quickSort = (toSort) =>{
    if(toSort.length<=1){
        return toSort
    }
    const index = getRandomInt(toSort.length)
    const pivot = toSort[index]
    const left = []
    const right = []
    for(let k = 0;k<toSort.length;k++){
        if(k===index){
            continue
        }
        if(toSort[k]<pivot){
            right.push(toSort[k])
        }else{
            left.push(toSort[k])
        }
    }
    return [...quickSort(left),pivot,...quickSort(right)]
}
const quickSort2 = (toSort) =>{
    _quickSort(toSort,0,toSort.length-1)
}
const _quickSort = (toSort,startI,endI) =>{
    if(startI>=endI){
        return
    }
    const index = getRandomInt(endI-startI+1)+startI
    const pivot = toSort[index]
    let i = startI
    let j = endI
    while(i<j){
        if(toSort[i]>pivot && toSort[j]<pivot){
            swap(toSort,i,j)
        }
        if(toSort[i]<=pivot){
            i++
        }
        if(toSort[j]>=pivot){
            j--
        }
    }
    if(index<i && toSort[i]>pivot){
        i--
    }else if(index>i && toSort[i]<pivot){
        i++
    }
    swap(toSort,index,i)
    _quickSort(toSort,startI,i-1)
    _quickSort(toSort,i+1,endI)
}

/* ---Functions used to generate data--- 
const measureArrayPerformance = (callback, array) => {
    if(typeof callback !== "function" || !Array.isArray(array)) throw new TypeError("Arguments must be of type (function,array)")
    const start = performance.now()
    callback(array)
    const end = performance.now()
    return end - start
}

const measureAveragePerformance = (funcToMeasure,{arrays=[],MAXREP=20,MAXLENGTH=2,MAXVALUE=20}={}) =>{
    if(arrays.length===0){
        arrays = []
        for(let i = 0; i< MAXREP; i++){
            const array = Array.from({length: MAXLENGTH}, () => getRandomInt(MAXVALUE))
            arrays.push(array)
        }
    }
    const measuredTime = []
    for(let i = 0; i< MAXREP; i++){
        measuredTime.push(measureArrayPerformance(funcToMeasure, arrays[i]))
    }
    return measuredTime.reduce((acc, curr) => acc + curr, 0)/measuredTime.length
}
*/