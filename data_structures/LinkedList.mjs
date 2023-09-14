import {Node} from './Node.mjs';

class LinkedList{
    #first;
    #length;
    constructor(){
        this.#first = null;
        this.#length = 0;
    }
    insert(value, index){
        let node = new Node(value);
        if(index === 0 || this.#first === null){
            // inserting at the beginning is handled as a special case
            node.next = this.#first;
            this.#first = node;
        }else{
            let current = this.#first;
            let i = 0;
            while(i<(index-1) && current.next !== null){
                current = current.next;
                i++;
            }
            node.next = current.next;
            current.next = node;
        }
        this.#length++;
    }
    remove(index){
        if(index >= this.#length){
            throw new Error("Index out of bounds");
        }
        if(index === 0){
            // removing at the beginning is handled as a special case
            this.#first = this.#first.next;
        }else{
            let current = this.#first;
            let i = 0;
            while(i<(index-1) && current.next !== null){
                current = current.next;
                i++;
            }
            current.next = current.next.next;
        }
        this.#length--;
    }
    search(value){
        // search if a value is in the list (Doesn't return the node)
        let current = this.#first;
        while(current !== null){
            if(current.value === value){
                return true;
            }
            current = current.next;
        }
        return false;
    }
    get(index){
        if(index >= this.#length){
            throw new Error("Index out of bounds");
        }
        let current = this.#first;
        let i = 0;
        while(i<index){
            current = current.next;
            i++;
        }
        return current.value;
    }
    static hasCycle(list){
        let slow = list.#first;
        let fast = list.#first;
        while(fast !== null && fast.next !== null){
            slow = slow.next;
            fast = fast.next.next;
            if(slow === fast){
                return true;
            }
        }
        return false;
    }
    get length(){
        return this.#length;
    }
}

export default LinkedList;