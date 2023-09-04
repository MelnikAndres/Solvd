class AsyncOperationManager {
    simulateAsyncOperation(delay) {
        setTimeout(() => {
            console.log(`Async operation completed after ${delay} ms`);
            process.nextTick(() => {
                console.log("This message shows after setTimeout");
            });
        }, delay);
    }

    scheduleImmediate() {
        setImmediate(() => {
            console.log("Immediate task executed");
            process.nextTick(() => {
                console.log("This message shows after setImmediate");
            });
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
This message shows after setImmediate
Async operation completed after 200 ms
This message shows after setTimeout

or:
Microtask executed immediately
Async operation completed after 200 ms
This message shows after setTimeout
Immediate task executed
This message shows after setImmediate

depending on the performance of the process.
*/
//if we lower the delay of our async operation, we would definitely see some cases where the timeout is executed before the immediate task
