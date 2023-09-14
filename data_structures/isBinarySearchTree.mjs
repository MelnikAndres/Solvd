const isBinarySearchTree = (tree) => {
    let isBST = true;
    let lastValue = null;
    tree.traverseInOrder((value) => {
        console.log(value)
        if(lastValue !== null && value < lastValue){
            isBST = false;
        }
        lastValue = value;
    });
    return isBST;
}

export default isBinarySearchTree;