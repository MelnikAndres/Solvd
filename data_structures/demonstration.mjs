import Graph from './Graph.mjs';
import BinarySearchTree from './BinarySearchTree.mjs';
import LinkedList from './LinkedList.mjs';
import StackMinMax from './StackMinMax.mjs';

const binarySearchTreeDemonstration = () => {
    let binarySearchTree = new BinarySearchTree();
    binarySearchTree.insert(5);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(2);
    binarySearchTree.insert(4);
    binarySearchTree.insert(6);
    binarySearchTree.insert(8);
    let result = ""
    console.log("Traverse In Order")
    binarySearchTree.traverseInOrder((value) => result += value + ", ");
    console.log(result);
    result = ""
    console.log("Traverse Pre Order")
    binarySearchTree.traversePreOrder((value) => result += value + ", ");
    console.log(result);
    result = ""
    console.log("Traverse Post Order")
    binarySearchTree.traversePostOrder((value) => result += value + ", ");
    console.log(result);
    result = ""
    console.log("Traverse Level Order")
    binarySearchTree.traverseLevelOrder((value) => result += value + ", ");
    console.log(result);
    result = ""
    console.log("Search")
    console.log(binarySearchTree.search(4));
    console.log(binarySearchTree.search(9));
}
const graphDemonstration = () =>{
    let graph = new Graph(true);
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addVertex("E");
    graph.addVertex("F");
    graph.addVertex("G");
    graph.addVertex("H");
    graph.addEdge("A", "B",5);
    graph.addEdge("A", "C",3);
    graph.addEdge("A", "E",2);
    graph.addEdge("B", "D",2);
    graph.addEdge("C", "D",1);
    graph.addEdge("C", "B",1);
    graph.addEdge("C", "E",2);
    graph.addEdge("D", "E",1);
    graph.addEdge("E", "F",4);
    graph.addEdge("E", "G",1);
    graph.addEdge("F", "H",1);
    console.log("Breath First Search")
    let searchResult = "";
    graph.breadthFirstSearch("A", (value) => searchResult += value + ", ");
    console.log(searchResult);
    console.log("Depth First Search")
    searchResult = "";
    graph.depthFirstSearch("A", (value) => searchResult += value + ", ");
    console.log(searchResult);
    const result = graph.dijkstraShortestPath("A", "H");
    const result2 = graph.breadthFirstSearchShortestPath("A", "H");
    console.log("Dijkstra Shortest Path")
    let path = "H";
    let previous = result.get("H").previous;
    while(previous !== null){
        path = previous + " -> " + path;
        previous = result.get(previous).previous;
    }

    console.log(path, result.get("H").distance);
    console.log("Breadth First Search Shortest Path")
    path = "H";
    previous = result2.get("H").previous;
    while(previous !== null){
        path = previous + " -> " + path;
        previous = result2.get(previous).previous;
    }
    console.log(path, result2.get("H").distance);    
}
const linkedListDemonstration = () => {
    let linkedList = new LinkedList();
    linkedList.insert(5, 0);
    linkedList.insert(3, 0);
    linkedList.insert(7, 2);
    linkedList.insert(2, 0);
    linkedList.insert(4, 2);
    linkedList.insert(6, 4);
    linkedList.insert(8, 6);
    let result = ""
    console.log("Get")
    for(let i = 0; i<linkedList.length; i++){
        result += linkedList.get(i) + ", ";
    }
    console.log(result);

    console.log("Remove")
    linkedList.remove(0);//2
    linkedList.remove(1);//4
    linkedList.remove(2);//6
    result = ""
    for(let i = 0; i<linkedList.length; i++){
        result += linkedList.get(i) + ", ";
    }
    console.log(result);

    console.log("Search")
    console.log(linkedList.search(4));
    console.log(linkedList.search(9));
    console.log(linkedList.search(5));

}
const stackMinMaxDemonstration = () => {
    let stackMinMax = new StackMinMax();
    stackMinMax.push(5);
    stackMinMax.push(3);
    stackMinMax.push(7);
    stackMinMax.push(2);
    stackMinMax.push(4);
    stackMinMax.push(6);
    stackMinMax.push(8);
    console.log("Min: " + stackMinMax.getMin() + ", Max: " + stackMinMax.getMax());
    console.log("Pop")
    console.log(stackMinMax.pop() + ", "+ stackMinMax.pop());
    console.log("Min: " + stackMinMax.getMin() + ", Max: " + stackMinMax.getMax());
    console.log("Pop")
    console.log(stackMinMax.pop() + ", "+ stackMinMax.pop());
    console.log("Min: " + stackMinMax.getMin() + ", Max: " + stackMinMax.getMax());
}
console.log("Graph Demonstration")
graphDemonstration();
console.log("----------")
console.log("Binary Search Tree Demonstration")
binarySearchTreeDemonstration();
console.log("----------")
console.log("Linked List Demonstration")
linkedListDemonstration();
console.log("----------")
console.log("Stack Min/Max Demonstration")
stackMinMaxDemonstration();
console.log("----------")

//Stack and Queue are used in binary search tree, graph, and stack min/max, therefore they are not demonstrated here.