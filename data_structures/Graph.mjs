import Queue from './Queue.mjs';
import Stack from './Stack.mjs';
import { Edge } from './Node.mjs';

class Graph {
    #vertices;// Map<value, Set<Edge>>
    constructor() {
        this.#vertices = new Map();
    }
    addVertex(value) {
        if (this.#vertices.has(value)) {
            throw new Error("Vertex already exists");
        }
        this.#vertices.set(value, new Set());
    }
    addEdge(value1, value2, weight = 1) {
        if (!this.#vertices.has(value1) || !this.#vertices.has(value2)) {
            throw new Error("Both #vertices must exist");
        }
        this.#vertices.get(value1).add(new Edge(value2, weight));
        this.#vertices.get(value2).add(new Edge(value1, weight));
    }
    breadthFirstSearch(startingValue, callback) {
        //time complexity: O(V+E) (V: number of vertices, E: number of edges)
        if (!this.#vertices.has(startingValue)) {
            throw new Error("Vertex doesn't exist");
        }
        const visited = new Set();
        const queue = new Queue();
        queue.enqueue(startingValue);
        while (!queue.isEmpty()) {
            const value = queue.dequeue();
            if(visited.has(value)){
                // ensure that each vertex is visited only once, one vertex can be added to the queue multiple times before it is visited
                continue;
            }
            callback(value);
            visited.add(value);
            for (let edge of this.#vertices.get(value)) {
                if (!visited.has(edge.endNode)) {
                    queue.enqueue(edge.endNode);
                }
            }
        }
    }
    depthFirstSearch(startingValue, callback) {
        //time complexity: O(V+E) (V: number of vertices, E: number of edges)
        if (!this.#vertices.has(startingValue)) {
            throw new Error("Vertex doesn't exist");
        }
        const visited = new Set();
        const stack = new Stack();
        stack.push(startingValue);
        while (!stack.isEmpty()) {
            const value = stack.pop();
            if(visited.has(value)){
                // ensure that each vertex is visited only once, one vertex can be added to the queue multiple times before it is visited
                continue;
            }
            callback(value);
            visited.add(value);
            for (let edge of this.#vertices.get(value)) {
                if (!visited.has(edge.endNode)) {
                    stack.push(edge.endNode);
                }
            }
        }
    }
    dijkstraShortestPath(startingValue, endingValue) {
        //time complexity: O(V^2) (V: number of vertices) this can be improved to O(E*log(V)) with a priority queue (Heap)
        if (!this.#vertices.has(startingValue) || !this.#vertices.has(endingValue)) {
            throw new Error("Both #vertices must exist");
        }
        const unvisited = new Set(this.#vertices.keys());
        const distances = new Map();
        for (let vertex of unvisited) {
            distances.set(vertex, { distance: Infinity, previous: null });
        }
        let current = startingValue;
        distances.set(current, { distance: 0, previous: null });
        while (unvisited.size > 0) {
            unvisited.delete(current);
            let minEdge = null;
            for (let edge of this.#vertices.get(current)) {
                if (unvisited.has(edge.endNode)) {
                    // if a vertex is already visited, it's distance is already calculated and it doesn't need to be updated
                    const newDistance = distances.get(current).distance + edge.weight;
                    if (newDistance < distances.get(edge.endNode).distance) {
                        distances.set(edge.endNode, { distance: newDistance, previous: current});
                    }
                    if (minEdge === null || edge.weight < minEdge.weight) {
                        minEdge = edge;
                    }
                }
            }
            current = minEdge === null?unvisited.values().next().value:minEdge.endNode;
            //if there is no minimal edge to an unvisited vertex, pick any unvisited vertex. This is better done with a priority queue (Heap)
        }
        return distances;
        // return the distances map, path can be reconstructed from it.
        // if there is any specific structure needed for the path, it can be created here and returned instead of the distances map
    }
    breadthFirstSearchShortestPath(startingValue, endingValue) {
        //time complexity: O(VE) (V: number of vertices, E: number of edges)
        //E depends on the vertices in a cuadratic way, so it is can be replaced to V^2, making the time complexity O(V^3)
        if (!this.#vertices.has(startingValue) || !this.#vertices.has(endingValue)) {
            throw new Error("Both #vertices must exist");
        }
        const distances = new Map();
        for (let vertex of this.#vertices.keys()) {
            distances.set(vertex, { distance: Infinity, previous: null});
        }
        const queue = new Queue();
        queue.enqueue(startingValue);
        distances.set(startingValue, { distance: 0, previous: null});
        while (!queue.isEmpty()) {
            const value = queue.dequeue();
            for (let edge of this.#vertices.get(value)) {
                const newDistance = distances.get(value).distance + edge.weight;
                if (newDistance < distances.get(edge.endNode).distance) {
                    distances.set(edge.endNode, { distance: newDistance, previous: value});
                    queue.enqueue(edge.endNode);
                    // if the distance to a vertex is updated, it is added to the queue again 
                }
            }
        }
        return distances;
        // return the distances map, path can be reconstructed from it.
        // if there is any specific structure needed for the path, it can be created here and returned instead of the distances map
    }
}

export default Graph;