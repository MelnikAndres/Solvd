import { HashBucket } from "./Node.mjs";

class CustomHashTable {
    length;
    #internalLength;
    #data;
    #resizing;//to simplify code and avoid infinite loops while resizing
    constructor() {
        this.#internalLength = 13;
        this.#data = new Array(this.#internalLength);
        this.length = 0;
        this.#resizing = false;
    }

    hash(key) {
        let hash = 0;
        while(key.length < 17){
            //make sure the key is not too short
            key+=key;
        }
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i) + i;//incorpoate the key's characters and their position in the string
            hash += hash << 11;//spread the bits
            hash ^= hash >> 13;//distribute changes
        }
        return (hash >>> 0); // Ensure the result is a 32-bit unsigned integer
    }

    hashMod(key) {
        return this.hash(key) % this.#internalLength;//make the value fall in the range [0, this.#internalLength)
    }

    insert(key, value) {
        //linear probing
        if(typeof key !== "string"){
            throw new Error("Key must be a string");
        }
        if(key === ""){
            throw new Error("Key cannot be empty");
        }
        let index = this.hashMod(key);
        let duplicate = false;
        while (this.#data[index] !== undefined && this.#data[index].isActive()) {//find the first empty or inactive bucket
            if(this.#data[index].key === key){
                duplicate = true;
                break;
            }
            index++;
            if(index >= this.#internalLength){
                index = 0;
            }
        }
        this.#data[index] = new HashBucket(key, value);
        //HashBucket allows to mark deleted buckets, this is to ignore them while searching, otherwise collision resolution would not work
        if(!duplicate){
            this.length++;
        }
        this.resize();
    }

    get(key) {
        if(typeof key !== "string"){
            throw new Error("Key must be a string");
        }
        let index = this.hashMod(key);
        while (this.#data[index] !== undefined) {
            if(this.#data[index].key === key && this.#data[index].isActive()){
                return this.#data[index].value;
            }
            index++;
            if(index >= this.#internalLength){
                index = 0;
            }
        }
        throw new Error("Key not found");
    }
    has(key) {
        if(typeof key !== "string"){
            throw new Error("Key must be a string");
        }
        let index = this.hashMod(key);
        while (this.#data[index] !== undefined) {
            if(this.#data[index].key === key && this.#data[index].isActive()){
                return true
            }
            index++;
            if(index >= this.#internalLength){
                index = 0;
            }
        }
        return false;
    }

    delete(key) {
        // returns true if the key was deleted, false if it was not found
        if(typeof key !== "string"){
            throw new Error("Key must be a string");
        }
        let index = this.hashMod(key);
        while (this.#data[index] !== undefined) {
            if(this.#data[index].key === key && this.#data[index].isActive()){
                this.#data[index].delete();
                this.length--;
                this.resize();
                return true;
            }
            index++;
            if(index >= this.#internalLength){
                index = 0;
            }
        }
        return false;
    }

    iterate(callback) {
        if(typeof callback !== "function"){
            throw new Error("Argument must be a function");
        }
        for(let i = 0; i < this.#data.length; i++){
            if(this.#data[i] !== undefined && this.#data[i].isActive()){
                callback(this.#data[i].key, this.#data[i].value);
            }
        }
    }

    resize(){
        if(this.#resizing){
            return;
        }
        if(this.length/this.#internalLength > 0.65){
            this.#resizing = true;
            this.#internalLength *= 2;
            this.length = 0;
            const oldData = this.#data;
            this.#data = new Array(this.#internalLength);
            for(let i = 0; i < oldData.length; i++){
                if(oldData[i] !== undefined && oldData[i].isActive()){
                    this.insert(oldData[i].key, oldData[i].value);
                }
            }
        }else if(this.length/this.#internalLength < 0.1625 && this.#internalLength > 13){
            this.#resizing = true;
            this.#internalLength = Math.floor(this.#internalLength/2);
            this.length = 0;
            const oldData = this.#data;
            this.#data = new Array(this.#internalLength);
            for(let i = 0; i < oldData.length; i++){
                if(oldData[i] !== undefined && oldData[i].isActive()){
                    this.insert(oldData[i].key, oldData[i].value);
                }
            }
        }
        this.#resizing = false;
    }
}
/*
Analysis:
    Hash Function:
        Operations made to the hash are bitwise and sum operations, they are simple so the hash function is fast. 
        The hash function is random enough to avoid many collisions, but it is not perfect, so collisions are still possible.
    Hash Table:
        Structure and logic is very simple, so it's easy to understand and implement.
        Collisions are handled with linear probing, which is simple and fast, but it depends on the hash function to avoid clustering.
        The hash table is resized when it is 65% full, avoiding clustering and keeping the operations fast, but in exchange it uses more memory.
        The hash table is resized when it is just 16.25% full, to avoid wasting more memory and rezising too often.
        insert, get, has and delete are O(1) on average, but they can be O(n) in the worst case, where n is the number of elements in the hash table.
        insert, and delete are affected by the resizing, but resizing becomes less frequent as the hash table grows, so it can be "ignored".
*/

export default CustomHashTable;