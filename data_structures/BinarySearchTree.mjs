import { BinaryNode } from "./Node.mjs";
import Queue from "./Queue.mjs";

class BinarySearchTree {
    //time complexity of algorithms is O(n) in the worst case as the tree can be unbalanced
    #root;
    constructor() {
        this.#root = null;
    }
    insert(value) {
        let node = new BinaryNode(value);
        if (this.#root === null) {
            // The tree is empty and the new node will be the root
            this.#root = node;
        } else {
            this.#insertNode(this.#root, node);
        }
    }
    #insertNode(father, node) {
        if (node.value < father.value) {
            // less than father, go to the left
            if (father.left === null) {
                father.left = node;
            } else {
                this.#insertNode(father.left, node);
            }
        } else {
            // greater or equal than father, go to the right
            if (father.right === null) {
                father.right = node;
            } else {
                this.#insertNode(father.right, node);
            }
        }
    }
    search(value) {
        // search if a value is in the tree (Doesn't return the node)
        return this.#searchNode(this.#root, value);
    }
    #searchNode(node, value) {
        if (node === null) {
            return false;
        }
        if (node.value === value) {
            return true;
        }
        if (value < node.value) {
            return this.#searchNode(node.left, value);
        } else {
            return this.#searchNode(node.right, value);
        }
    }
    traversePreOrder(traverseFn) {
        this.#traversePreOrderNode(this.#root, traverseFn);
    }
    #traversePreOrderNode(node, traverseFn) {
        if (node === null) {
            return;
        }
        traverseFn(node.value);
        this.#traversePreOrderNode(node.left, traverseFn);
        this.#traversePreOrderNode(node.right, traverseFn);
    }
    traverseInOrder(traverseFn) {
        this.#traverseInOrderNode(this.#root, traverseFn);
    }
    #traverseInOrderNode(node, traverseFn) {
        if (node === null) {
            return;
        }
        this.#traverseInOrderNode(node.left, traverseFn);
        traverseFn(node.value);
        this.#traverseInOrderNode(node.right, traverseFn);
    }

    traversePostOrder(traverseFn) {
        this.#traversePostOrderNode(this.#root, traverseFn);
    }
    #traversePostOrderNode(node, traverseFn) {
        if (node === null) {
            return;
        }
        this.#traversePostOrderNode(node.left, traverseFn);
        this.#traversePostOrderNode(node.right, traverseFn);
        traverseFn(node.value);
    }
    traverseLevelOrder(traverseFn) {
        let queue = new Queue();
        if(this.#root!==null){
            queue.enqueue(this.#root);
        }
        while (!queue.isEmpty()) {
            let node = queue.dequeue();
            traverseFn(node.value);
            if(node.left!==null){
                queue.enqueue(node.left);
            }
            if(node.right!==null){
                queue.enqueue(node.right);
            }
        }
    }
}

export default BinarySearchTree;