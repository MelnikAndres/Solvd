function debounce(func, interval){
    if (typeof func !== "function" || typeof interval !== "number") throw new TypeError("Arguments should be of type (function, number)")
    let timeout;
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            func(...args)
        }, interval);
    }
}

export default debounce;