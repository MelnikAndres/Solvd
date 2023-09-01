class AsyncOperationManager {
    simulateAsyncOperation(delay) {
        setTimeout(() => {
            console.log(`Async operation completed after ${delay} ms`);
        }, delay);
    }

    scheduleImmediate() {
        setImmediate(() => {
            console.log("Immediate task executed");
        });
    }

    scheduleMicrotask() {
        process.nextTick(() => {
            console.log("Microtask executed immediately");
        });
    }
}
const manager = new AsyncOperationManager();

manager.simulateAsyncOperation(200);//this would be executed as soon as possible after the delay has passed


manager.scheduleMicrotask(); // this would be executed first, because it executes before the event loop is allowed to proceed


manager.scheduleImmediate();
//this would be executed after the poll phase, probably before the timeout because it has 200ms delay
//as it's not within an I/0 cycle, we can't define wheter it would be executed before the timeout or not.
/* 
Result could be:
Microtask executed immediately
Immediate task executed
Async operation completed after 200 ms

or:
Microtask executed immediately
Async operation completed after 200 ms
Immediate task executed

depending on the performance of the process.
*/
//if we lower the delay of our async operation, we would definitely see some cases where the timeout is executed before the immediate task

const fs = require('fs');

fs.readFile("eighthHomework.js", () => {
    manager.simulateAsyncOperation(200);//this would be executed as soon as possible after the delay has passed
    manager.scheduleMicrotask(); // this would be executed first, because it executes before the event loop is allowed to proceed
    manager.scheduleImmediate(); //this would be executed after the poll phase.

    //this callback will be executed on the poll phase, that's why the immediate task will be executed right after the microtask and always before the timeout.
});
/*
Result will always be:
Microtask executed immediately
Immediate task executed
Async operation completed after 200 ms

regardless of the delay of our async operation, because readFile is an I/0 operation.
*/
