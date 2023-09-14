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
class Edge {
    weight;
    endNode;
    constructor(endNode, weight) {
        this.weight = weight;
        this.endNode = endNode;
    }
}
export { Node, BinaryNode, Edge }