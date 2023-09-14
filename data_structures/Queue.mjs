import {Node} from './Node.mjs';

class Queue{
    #front;
    #last;
    constructor(){
        this.#front = null;
        this.#last = null;
    }
    enqueue(value){
        let node = new Node(value);
        if(this.isEmpty()){
            this.#front = node;
        }else{
            this.#last.next = node;
        }
        this.#last = node;
    }
    dequeue(){
        if(this.isEmpty()){
            throw new Error("Queue is empty");
        }
        let value = this.#front.value;
        this.#front = this.#front.next;
        return value;
    }
    peek(){
        if(this.isEmpty()){
            throw new Error("Queue is empty");
        }
        return this.#front.value;
    }
    isEmpty(){
        return this.#front === null;
    }
}

export default Queue;