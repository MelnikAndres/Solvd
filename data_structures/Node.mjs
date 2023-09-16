class Node {
    value;
    next;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class BinaryNode {
    value;
    left;
    right;
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
class RedBlackNode extends BinaryNode{
    color;
    constructor(value, color = false) {
        super(value);
        this.color = color;//false = red, true = black
    }
    setBlack(){
        this.color = true;
    }
    setRed(){
        this.color = false;
    }
    isRed(){
        return !this.color;
    }
}
class Edge {
    weight;
    endNode;
    constructor(endNode, weight) {
        this.weight = weight;
        this.endNode = endNode;
    }
}
class HashBucket {
    key;
    value;
    #active;
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.#active = true;
    }
    delete(){
        this.#active = false;
    }
    isActive(){
        return this.#active;
    }
}
export { Node, BinaryNode, Edge, RedBlackNode, HashBucket }