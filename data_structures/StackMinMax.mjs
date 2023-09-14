import Stack from "./Stack.mjs";

class StackMinMax extends Stack{
    #minStack;
    #maxStack;
    constructor(){
        super();
        this.#minStack = new Stack();
        this.#maxStack = new Stack();    
    }
    push(value){
        super.push(value);
        if(this.#minStack.isEmpty() || value <= this.#minStack.peek()){
            this.#minStack.push(value);
        }
        if(this.#maxStack.isEmpty() || value >= this.#maxStack.peek()){
            this.#maxStack.push(value);
        }
    }
    pop(){
        let value = super.pop();
        if(value === this.#minStack.peek()){
            this.#minStack.pop();
        }
        if(value === this.#maxStack.peek()){
            this.#maxStack.pop();
        }
        return value;
    }
    getMin(){
        return this.#minStack.peek();
    }
    getMax(){
        return this.#maxStack.peek();
    }
}

export default StackMinMax;