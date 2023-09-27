import Stack from "./data_structures/Stack.mjs"
//objects, arrays, strings, numbers, booleans, and null values.

function myJSONParse(jsonString, reviver = (key, value) => value) {
    const jsonRegEx = /(?:(?<property>"(?:(?<=\\)"|[^"])+")\s*:\s*)?(?<value>"(?:(?<=\\)[^]|[^"])+"|[\d]+|true|false|null|\{|\[)(?=\s*(?<commaV>,)?)|(?<=(?<trailComma>,)?\s*)(?<close>\}|\])(?=\s*(?<commaC>,)?)/g
    /*regex explanation:
        1.- (?:(?<property>"(?:(?<=\\)"|[^"])+")\s*:\s*)?
            1.1.- (?<property>"(?:(?<=\\)"|[^"])+") => matches a string between quotes, and saves it in the property group
            1.2.- [^"]+ => will keep matching any character until a quote is found
            1.3.- (?<=\\)" => will match a quote only if it's preceded by a backslash
            1.4.- (?:(?<=\\)"|[^"])+ => will match either a quote preceded by a backslash or any character that is not a quote
            1.5.- \s*:\s* => matches the colon and any spaces around it
            1.6.- (?:...) => the useful part is the property group, we don't want to capture the spaces and the colon
            1.7.- ? => the property group is optional, because it's not needed for single values
        2.- (?<value>"(?:(?<=\\)[^]|[^"])+"|[\d]+|true|false|null|\{|\[)(?=\s*(?<commaV>,)?)
            1.1.- (?<value>"(?:(?<=\\)[^]|[^"])+"|[\d]+|true|false|null|\{|\[) => matches a string between quotes, a number, a boolean, null, an open bracker or an open square bracket, and saves it in the value group
            1.2.- (?=\s*(?<commaV>,)?) => will check if there is a comma after the value,if there is it will be saved in the commaV group. We are looking, but not matching the comma, to allow the next match to see it too
        3.- |(?<=(?<trailComma>,)?\s*)(?<close>\}|\])(?=\s*(?<commaC>,)?)
            1.1.- | => the regEx it's separated in two possible matches, the first one is for properties and values, the second one is for closing brackets
            1.2.- (?<=(?<trailComma>,)?\s*) => will check if there is a comma before the closing bracket, if there is it will be saved in the trailComma group.
            1.3.- (?<close>\}|\]) => matches a closing bracket, and saves it in the close group
            1.4.- (?=\s*(?<commaC>,)?) => will check if there is a comma after the closing bracket,if there is it will be saved in the commaC group. We are looking, but not matching the comma, to allow the next match to see it too.
        4.- g => global flag, allows to use lastIndex        
    */
    
    const start = /(?<=^\s*)(?:\{|\[)/.exec(jsonString)
    //regex explanation: (?<=^\s*) => will look only for spaces before the opening bracket (will not match if there is something else); (?:\{|\[) => matches an opening bracket
    //separately obtaining the start of the json string, just to clean up the regex a bit
    if (!start[0]) {
        throw new Error("Invalid JSON, missing valid root element")
    }
    let context = start[0] === "{" ? {} : [];
    const contextHolder = new Stack() //stack to avoid recursion
    jsonRegEx.lastIndex = start.index + start[0].length //avoid matching the start again
    let isMore = true;
    let match;
    let result;//context could be used as result, but this way allows to check for multiple root elements

    while ((match = jsonRegEx.exec(jsonString))) {
        if (!context) {
            //if context is undefined, it means we have already parsed the full root element, so it shouldn't keep matching
            throw new Error("Invalid JSON, multiple root elements")
        }
        console.log(match)
        const groups = match.groups
        let toPush;
        if (groups.value !== undefined) {
            //conditions are arranged this way to avoid repeating code for (property: value) and value
            //what is here has to be done for single values and for (property: value) pairs
            if (!isMore) {
                throw new Error("Invalid JSON, missing comma at position " + match.index)
            }
            const parsedValue = parseValue(groups.value)
            if (parsedValue === undefined) {
                throw new Error("Invalid JSON, invalid value at position " + match.index)
            }
            toPush = reviver(groups.property?parseJsonString(groups.property):context.length,parsedValue)
            //toPush is the value to be pushed later to the context
            if (toPush !== null && (typeof toPush === "object")) {
                contextHolder.push(context)//because later we will replace context with toPush
            } else {
                isMore = groups.commaV !== undefined
            }
        }
        if (groups.property !== undefined) {
            //property:value case
            const key = parseJsonString(groups.property)
            if (context instanceof Array) {
                throw new Error("Invalid JSON, array can't have properties, only values (at position " + match.index + ")")
            }
            context[key] = toPush
        } else if (toPush !== undefined) {
            //signle value case
            if (!(context instanceof Array)) {
                throw new Error("Invalid JSON, missing or invalid property name at position " + match.index)
            }
            context.push(toPush)
        } else if (groups.close !== undefined) {
            //closing bracket case
            if (groups.trailComma) {
                throw new Error("Invalid JSON, trailing comma at position " + match.index)
            }
            if (groups.close === "}" && context instanceof Array) {
                throw new Error("Invalid JSON, wrong closing bracket at position " + match.index)
            }
            if (groups.close === "]" && !(context instanceof Array)) {
                throw new Error("Invalid JSON, wrong closing bracket at position " + match.index)
            }
            isMore = groups.commaC !== undefined
            if (contextHolder.isEmpty()) {
                //if the stack is empty, it means we have already parsed the full root element
                result = context
                context = undefined
            } else {
                //if the stack is not empty, it means we have to keep parsing the previous context
                context = contextHolder.pop()
            }
        }
        if (toPush !== null && (typeof toPush === "object")) {
            context = toPush
            //as said before, if toPush is an object, it will be the new context
            //this is done here to avoid conflicts while pushing the value to it's corresponding context
        }
        jsonRegEx.lastIndex = match.index + match[0].length
        //match[0] is the whole match, needed to know the next index to start matching
    }

    return result
}

function parseValue(stringValue) {
    if (stringValue === "{") {
        return {}
    }
    if (stringValue === "[") {
        return []
    }
    if (stringValue === "true") {
        return true
    }
    if (stringValue === "false") {
        return false
    }
    if (stringValue === "null") {
        return null
    }
    if (stringValue[0] === '"' && stringValue[stringValue.length - 1] === '"') {
        return parseJsonString(stringValue)
    }
    if (!isNaN(stringValue)) {
        return Number(stringValue)
    }
    return undefined
}

function parseJsonString(string) {
    const sliced = string.slice(1, -1)
    const unicodeEscaped = sliced.replace(/\\u(?<code>[\da-fA-F]{0,4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    //JSON.parse will throw an error if unicode code is not of 4 digits, but String.fromCharCode will not, passing 24 it's the same as 0024, so we will let it pass
    return unicodeEscaped.replace(/\\([^])/g, "$1")
}
const test1 = () => {
    const testJSON = `[
        1,
        2,
        {
            "a": "a"
        }
    ]`
    const result = myJSONParse(testJSON)
    const expected = JSON.parse(testJSON)
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error("Test 1 failed")
    }
}
const test2 = () => {
    const testJSON = ` 
    {
       "first": [
           "1",
           2,
           true,
           null ,
           null,
           {
               "fsecond": "fsecond"
           },
           [
               1,
               2
           ]
       ],
       "second": {
           "fthird": "fthird",
           "fsecond": "fsecond"
       },
       "third": "third",
       "null": null
    }`
    const result = myJSONParse(testJSON)
    const expected = JSON.parse(testJSON)
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error("Test 2 failed")
    }
}
const test3 = () => {
    const testJSON = `{}`
    const result = myJSONParse(testJSON)
    const expected = JSON.parse(testJSON)
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error("Test 3 failed")
    }
}
const test4 = () => {
    const testJSON = `{"\\"b\\"":2}`
    const result = myJSONParse(testJSON)
    const expected = JSON.parse(testJSON)
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error("Test 4 failed")
    }
}
const test5 = () => {
    const testJSON = `{"10\\u0024":10}`
    const result = myJSONParse(testJSON)
    const expected = JSON.parse(testJSON)
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error("Test 5 failed")
    }
}
const test6 = () => {
    const testJSON = `{"hundred":10,"list":[1,2,3,"text"],"obj":{"forty":20, "bool":true}}`
    const reviver = (key, value) => {
        if(typeof value === 'number'){
            return key === 'hundred'?value*10:value*2
        }
        return value
        }
    const result = myJSONParse(testJSON, reviver)
    const expected = JSON.parse(testJSON, reviver)
    if (JSON.stringify(result) !== JSON.stringify(expected)) {
        throw new Error("Test 6 failed")
    }
}
const runTests = () => {
    test1()
    test2()
    test3()
    test4()
    test5()
    test6()
}

runTests()


/*
Reflection:
    Regular expressions are very powerful, at first they look like a mess and may frighten you, but once you understand them, they are very useful.
    I decided to use only one regex, to challenge myself, but breaking it into smaller regexes may be a better idea.
    It took me a while to understand, but now I feel comfortable using regex.
    My first approach was to solve smaller problems, like matching a string between quotes, or matching a key-value pair, and then I started to put everything together.
    I had some difficulties when trying to match properties or values only with the same regex, but with documentation, testing and debugging I managed to solve it.
    I also had a hard time understanding matching groups at first, but i knew they were the key to solve this problem, so I kept reading documentation and testing until I understood them.
    Regex allows to have a more compact and faster to write code, but it's harder to read and understand than a more verbose code.
    I am happy to keep keep adding new tools to my toolbox, regex is a must know for any developer.
*/