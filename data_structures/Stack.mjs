import {Node} from './Node.mjs';

class Stack{
    #top;
    constructor(){
        this.#top = null;
    }
    push(value){
        let node = new Node(value);
        node.next = this.#top;
        this.#top = node;
    }
    pop(){
        if(this.isEmpty()){
            throw new Error("Stack is empty");
        }
        let value = this.#top.value;
        this.#top = this.#top.next;
        return value;
    }
    peek(){
        if(this.isEmpty()){
            throw new Error("Stack is empty");
        }
        return this.#top.value;
    }
    isEmpty(){
        return this.#top === null;
    }
}

export default Stack;