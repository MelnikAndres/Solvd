class Heap {
    #heap;
    #isMinHeap;
	constructor(isMinHeap = false) {
		this.#heap = [];
        this.#isMinHeap = isMinHeap;
	}

	// Helper Methods
	getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}
	getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}
	getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}
	hasLeftChild(index) {
		return this.getLeftChildIndex(index) < this.#heap.length;
	}
	hasRightChild(index) {
		return this.getRightChildIndex(index) < this.#heap.length;
	}
	hasParent(index) {
		return this.getParentIndex(index) >= 0;
	}
	leftChild(index) {
		return this.#heap[this.getLeftChildIndex(index)];
	}
	rightChild(index) {
		return this.#heap[this.getRightChildIndex(index)];
	}
	parent(index) {
		return this.#heap[this.getParentIndex(index)];
	}

	// Functions to create Min Heap
	
	swap(indexOne, indexTwo) {
		const temp = this.#heap[indexOne];
		this.#heap[indexOne] = this.#heap[indexTwo];
		this.#heap[indexTwo] = temp;
	}

	peek() {
		if (this.#heap.length === 0) {
			return null;
		}
		return this.#heap[0];
	}

	remove() {
		if (this.#heap.length === 0) {
			return null;
		}
		const item = this.#heap[0];
		this.#heap[0] = this.#heap[this.#heap.length - 1];
		this.#heap.pop();
		this.heapifyDown();
		return item;
	}

	add(item) {
		this.#heap.push(item);
		this.heapifyUp();
	}

    compare(a,b){
        if(this.#isMinHeap){
            return a<b
        }else{
            return a>b
        }
    }

	heapifyUp() {
		let index = this.#heap.length - 1;
		while (this.hasParent(index) && this.compare(this.#heap[index],this.parent(index))) {
			this.swap(this.getParentIndex(index), index);
			index = this.getParentIndex(index);
		}
	}

	heapifyDown() {
		let index = 0;
		while (this.hasLeftChild(index)) {
			let childIndex = this.getLeftChildIndex(index);
			if (this.hasRightChild(index) && this.compare(this.rightChild(index),this.leftChild(index))) {
				childIndex = this.getRightChildIndex(index);
			}
			if (this.compare(this.#heap[index],this.#heap[childIndex])) {
				break;
			} else {
				this.swap(index, childIndex);
			}
			index = childIndex;
		}
	}
    get length(){
        return this.#heap.length
    }
}

var MedianFinder = function() {
    this.smallerHeap = new Heap()
    this.biggerHeap = new Heap(true)
    this.median = null
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    if(this.median === null){
        this.median = num
        return
    }
    if(num<this.median){
        this.smallerHeap.add(num)
        if(this.smallerHeap.length>this.biggerHeap.length+1){
            this.biggerHeap.add(this.median)
            this.median = this.smallerHeap.remove()
        }
    }else{
        this.biggerHeap.add(num)
        if(this.biggerHeap.length>this.smallerHeap.length+1){
            this.smallerHeap.add(this.median)
            this.median = this.biggerHeap.remove()
        }
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if(this.smallerHeap.length>this.biggerHeap.length){
        return (this.smallerHeap.peek() + this.median)/2
    }
    if(this.biggerHeap.length>this.smallerHeap.length){
        return (this.biggerHeap.peek() + this.median)/2
    }
    return this.median
};

export default MedianFinder;