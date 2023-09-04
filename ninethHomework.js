const promiseAll = (promises) =>{
    return new Promise((resolve, reject) =>{
        const resolved = Array.from({length:promises.length})
        let resolvedCount = 0
        for(let i = 0; i < promises.length; i++){
            promises[i].then((value) =>{
                resolved[i] = value
                resolvedCount++
                if(resolved.length === resolvedCount){
                    resolve(resolved)
                }
            },(error) =>reject(error))
        }
    })
}

const promiseAllSettled = (promises) =>{
    return new Promise((resolve,_) =>{
        const resolved = Array.from({length:promises.length})
        let resolvedCount = 0
        for(let i = 0; i < promises.length; i++){
            promises[i].then((value) =>{
                resolved[i] = {status:"fulfilled",value:value}
                resolvedCount++
            },(error) =>{
                resolved[i] = {status:"rejected",reason:error}
                resolvedCount++
            }).finally(() =>{
                if(resolved.length === resolvedCount){
                    resolve(resolved)
                }
            })
        }
    })
}

const chainPromises = (asyncFns) =>{
    return new Promise((resolve,reject) =>{
        const result = asyncFns.reduce((promise,asyncFn)=>promise.then((result)=>asyncFn(result)),Promise.resolve())
        result.then((value) =>resolve(value),(error) =>reject(error))
    })
}

const promisify = (fn) =>{
    return  (...args) =>{
        return new Promise((resolve,reject) => { 
            const callback = (error,value) => {
                if(!error){
                    resolve(value)
                }else{
                    reject(error)
                }
            }
            fn(args,callback)
        });
    };
}