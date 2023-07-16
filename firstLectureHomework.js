const plusOnStrings = (str1,str2) =>{
    return _plusOnStrings(str1,str2,false)
}
const _plusOnStrings = (str1,str2,isReversed) =>{
    const is1longer = str1.length>str2.length
    if(isReversed){
        if(is1longer){
            str2 = str2.padEnd(str1.length,"0")
        }else{
            str1 = str1.padEnd(str2.length,"0")
        }
    }else{
        if(is1longer){
            str2 = str2.padStart(str1.length,"0")
        }else{
            str1 = str1.padStart(str2.length,"0")
        }
    }
    let sum = 0
    let strC = ""
    for(let i = str1.length-1;i>=0;i--){
        const carry =sum>=10 ? 1:0
        sum = parseInt(str1[i]) + parseInt(str2[i]) + carry
        strC += sum%10
    }
    strC += sum>=10? 1 : ""
    return reverseString(strC)
}
const minusOnStrings = (str1, str2) =>{
    const is1longer = str1.length>str2.length
    if(is1longer){
        str2 = str2.padStart(str1.length,"0")
    }else{
        str1 = str1.padStart(str2.length,"0")
    }
    let resultIsNegative = false;
    for(let i = 0;i<str1.length;i++){
        const digitFrom1 = parseInt(str1[i])
        const digitFrom2 = parseInt(str2[i])
        if(digitFrom1>digitFrom2){
            resultIsNegative = false;
            break  
        }
        if(digitFrom2>digitFrom1){
            resultIsNegative = true;
            [str1, str2] = [str2, str1]
            break
        }
    }
    let sum = 0
    let strC = ""
    for(let i = str1.length-1;i>=0;i--){
        const carry = sum<0? 1:0
        sum = parseInt(str1[i]) - parseInt(str2[i]) - carry
        strC += sum<0? sum+10 : sum
    }
    strC = trimLeadingZeros(reverseString(strC))
    return resultIsNegative?"-"+strC:strC
}

const reverseString = (toReverse) =>{
    let result = ""
    for(let i = toReverse.length-1;i>=0;i--){
        result += toReverse[i]
    }
    return result
}

const trimLeadingZeros = (strA) =>{
    const result = strA.replace(/^0+/,"")
    return result != "" ? result : "0";
}

const multiplyOnStrings = (str1, str2) =>{
    let partialResults = []
    let mul = 0
    for(let i=str1.length-1;i>=0;i--){
        let partialIndex = (str1.length-1)-i
        partialResults.push("0".repeat(partialIndex))
        for(let j = str2.length-1;j>=0;j--){
            const carry = ~~(mul/10)
            mul = parseInt(str1[i]) * parseInt(str2[j]) + carry
            partialResults[partialIndex] += mul%10
        }
        partialResults[partialIndex] += mul>=10?~~(mul/10):""
        mul = 0
    }
    let result = partialResults[0]
    for(let i = 1;i<partialResults.length;i++){
        result = _plusOnStrings(result,partialResults[i],true)
    }
    return reverseString(result)
}

const divideOnStrings = (str1, str2) =>{
    let carriedDividend = str1.substr(0,str2.length-1)
    let result = ""
    for(let i = 0; i<=str1.length - str2.length;i++){
        carriedDividend += str1[str2.length-1+i]
        const isDouble = carriedDividend.length>str2.length;
        const partialDividend = isDouble?carriedDividend[0]+ carriedDividend[1]:carriedDividend[0]
        const partialDivisor = str2[0]
        let partialDivision = ~~(parseInt(partialDividend)/parseInt(partialDivisor))
        let partialRest = parseInt(partialDividend)%parseInt(partialDivisor)
        let isValidValue = false;
        let nau;
        while(!isValidValue){
            isValidValue = true
            nextCarriedDividend = partialRest.toString() //it can be as big as str2, so it should be a string too
            for(let k = 1; k<str2.length;k++){
                let partial = nextCarriedDividend + parseInt(carriedDividend[isDouble?k+1:k])
                nextCarriedDividend = minusOnStrings(partial,(parseInt(str2[k])*partialDivision).toString())
                if(nextCarriedDividend[0]=="-"){
                    partialDivision-=1
                    partialRest+=parseInt(str2[0])
                    isValidValue = false
                    break
                }
            }
        }
        carriedDividend = nextCarriedDividend.padStart(str2.length-1,"0")
        result += partialDivision
    }
    return trimLeadingZeros(result)
}

