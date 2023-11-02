import { RedBlackTree } from "./RedBlackTree.mjs";

const testLeftLeft = () => {
    let redBlackTree = new RedBlackTree();
    redBlackTree.insert(10);
    redBlackTree.insert(5);
    redBlackTree.insert(15);
    redBlackTree.insert(3);
    let result = ""
    redBlackTree.traverseInOrder((node) => result += node.color ? node.value + "B" + ", " : node.value + "R" + ", ");
    console.log(result);
    return new RedBlackTree().isBRT();
}

const testRightRight = () => {
    const redBlackTree = new RedBlackTree();
    redBlackTree.insert(5);
    redBlackTree.insert(10);
    redBlackTree.insert(3);
    redBlackTree.insert(15);
    redBlackTree.insert(20);
    let result = ""
    redBlackTree.traverseInOrder((node) => result += node.color ? node.value + "B" + ", " : node.value + "R" + ", ");
    console.log(result);
    return new RedBlackTree().isBRT();
}

const testLeftRight = () => {
    const redBlackTree = new RedBlackTree();
    redBlackTree.insert(10);
    redBlackTree.insert(3);
    redBlackTree.insert(15);
    redBlackTree.insert(13);
    redBlackTree.insert(14);
    let result = ""
    redBlackTree.traverseInOrder((node) => result += node.color ? node.value + "B" + ", " : node.value + "R" + ", ");
    console.log(result);
    return new RedBlackTree().isBRT();
}

const testRightLeft = () => {
    const redBlackTree = new RedBlackTree();
    redBlackTree.insert(10);
    redBlackTree.insert(3);
    redBlackTree.insert(15);
    redBlackTree.insert(7);
    redBlackTree.insert(5);
    let result = ""
    redBlackTree.traverseInOrder((node) => result += node.color ? node.value + "B" + ", " : node.value + "R" + ", ");
    console.log(result);
    return new RedBlackTree().isBRT();
}

const testTo13 = () => {
    const redBlackTree = new RedBlackTree();
    for(let i = 1; i <= 13; i++){
        redBlackTree.insert(i);
    }
    let result = ""
    redBlackTree.traverseInOrder((node) => result += node.color ? node.value + "B" + ", " : node.value + "R" + ", ");
    console.log(result);
    return new RedBlackTree().isBRT();
}


const fastTest = () => {
    const redBlackTree = new RedBlackTree();
    redBlackTree.insert(10);
    redBlackTree.insert(5);
    redBlackTree.insert(15);
    redBlackTree.insert(20);
    redBlackTree.insert(25);
    redBlackTree.insert(30);
    redBlackTree.insert(23);
    redBlackTree.delete(15);
    redBlackTree.delete(23);
    let result = ""
    redBlackTree.traverseInOrder((node) => result += node.color ? node.value + "B" + ", " : node.value + "R" + ", ");
    console.log(result);
    redBlackTree.delete(30);
    result = ""
    redBlackTree.traverseInOrder((node) => result += node.color ? node.value + "B" + ", " : node.value + "R" + ", ");
    console.log(result);
    return new RedBlackTree().isBRT();
}
const runTests = () => {
    if(!testLeftLeft()){
        throw new Error("testLeftLeft failed");
    };
    if(!testRightRight()){
        throw new Error("testRightRight failed");
    }
    if(!testLeftRight()){
        throw new Error("testLeftRight failed");
    }
    if(!testRightLeft()){
        throw new Error("testRightLeft failed");
    }
    if(!testTo13()){
        throw new Error("testTo13 failed");
    }
    if(!fastTest()){
        throw new Error("fastTest failed");
    }
}
//delete cases
/*
    1. node is a leaf:
        1.1. node is red -> just delete
        1.2. node is black -> delete and fix
    2. node has one child:
        2.1. node is black -> just replace with it's child painted black
    3. node has two children:
        3.1. node is red, successor is red -> just replace
        3.2. node is red, successor is black -> replace and fix
        3.3. node is black, successor is red -> replace and paint successor black
        3.4. node is black, successor is black -> replace and fix
*/

if(!fastTest()){
    throw new Error("fastTest failed");
}