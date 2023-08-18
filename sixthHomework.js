const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web"
    }
};

const language = "fr"; // Change to "en" for English  
const greeting = "greet";
const introduction = "intro";

const localize = (strings, ...expressions) => {
    return expressions.reduceRight((accum, actual, i) => `${strings[i]}${translations[language][actual]}${accum}`, strings[strings.length - 1])
}

const highlightKeywords = (template, expression) => {
    // /\$\{(\d+)\}/ will match ${d} where d is an integer
    const splitTemplate = template.split(/\$\{(\d+)\}/);
    return splitTemplate.reduceRight((accum, actual, i) => i & 1 ? `<span class='highlight'>${expression[actual]}</span>${accum}` : `${actual}${accum}`)
}

const multiline = (strings, ...expressions) => {
    // /((?<!\\)\n)/ will match \n if not preceded by \
    let counter = 1
    strings = strings.map(
        (string) =>
            string.split(/((?<!\\)\n)/)
                .reduce((accum, actual) =>
                    actual === "\n" ?
                        `${accum}${actual}${counter++} ` :
                        `${accum}${actual}`))
    return expressions.reduceRight((accum, actual, i) => `${strings[i]}${actual}${accum}`, strings[strings.length - 1])
}

const debounce = (fn, milliseconds) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            fn(...args)
        }, milliseconds);
    }
}

const throttle = (func, interval) => {
    let waiting = false;
    return (...args) => {
        if (waiting) {
            return
        }
        waiting = true
        func(...args)
        setTimeout(() => {
            waiting = false
        }, interval);
    }
}

const curry = (func, arity) =>{
    const args = []
    function curried(x){
        args.push(x==="_"?undefined:x)
        if(args.length >= arity){
            return func(...args)
        }
        return curried
    }
    return curried
}