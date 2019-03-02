class Heap {
  constructor(comparison_function) {
    this.heapContainer = [];
    this.compare = new Comparator(comparison_function);
  }
  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1;
  }
  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  hasLeftChild(parentIndex) {
    return (this.getLeftChildIndex(parentIndex) < this.heapContainer.length);
  }
  hasRightChild(parentIndex) {
    return (this.getRightChildIndex(parentIndex) < this.heapContainer.length);
  }
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  //Checks top value
  peek() {
    if (this.heapContainer.length) {
      return this.heapContainer[0];
    }
    return null;
  }

  //Poll takes the max or min value of a heap, and then reorganizes the heap as needed
  poll() {
    if (!this.heapContainer.length) {
      return null;
    } else if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }
    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }
  swap(index1, index2) {
    const val1 = this.heapContainer[index1];
    this.heapContainer[index1] = this.heapContainer[index2];
    this.heapContainer[index2] = val1;
  }

  //Moves an element up an array until it is in the correct position
  heapifyUp(index) {
    let currentIndex = index || this.heapContainer.length - 1;
    while (this.hasParent(currentIndex) && !this.correctOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
      let pindex = this.getParentIndex(currentIndex);
      this.swap(pindex, currentIndex);
      currentIndex = pindex;
    }
  }
  heapifyDown(startIndex = 0) {
    let currentIndex = startIndex;
    while (this.hasLeftChild(currentIndex)) {
      let nextIndex = this.getLeftChildIndex(currentIndex);
      if (this.hasRightChild(currentIndex)) {
        if (this.correctOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
          nextIndex = this.getRightChildIndex(currentIndex);
        }
      }
      if (this.correctOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }
      this.swap(currentIndex, nextIndex);
    }
  }
  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
    return this;
  }
  remove(item, comparator = this.compare) {
    //Steps: First find all indices to be removed. Then go remove each one and heapify the heap again
    //const indicesToRemove = this.find(item);
    const numIndices = this.find(item, comparator).length;
    
    for (let i = 0; i < numIndices; i++) {
      const indexToRemove = this.find(item, comparator).pop();
      
      //If its final element, just pop it, no need to re-sift
      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop();
      }
      else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        //Replace index to be removed with final element
        
        const parentItem = this.parent(indexToRemove);
        
        //We heapify down if element can be heapified down and if there exists a parent or the parent is in correct order already. Otherwise we heapify up.
        
        //Better to check if it has left child first because there is a higher likelihood it doesn't in comparison to it not having a parent (only one element doesn't have a parent)
        if (this.hasLeftChild(indexToRemove) && (!parentItem || this.correctOrder(this.parent(indexToRemove), indexToRemove))) {
          this.heapifyDown(indexToRemove);
        }
        else {
          this.heapifyUp(indexToRemove);
        }
        
      }
    }
    return this;
  }
  find(item, comparator = this.compare) {
    let foundIndices = [];
    for (let i = 0; i < this.heapContainer.length; i++) {
      if (this.compare.equal(item, this.heapContainer[i])) {
        foundIndices.push(i);
      }
    }
    return foundIndices;
  }
  isEmpty() {
    return !this.heapContainer.length;
  }
  toString() {
    return this.heapContainer.toString();
  }

}

class MaxHeap extends Heap {
  constructor() {
    super();
    this.kind = "Max";
  }
  correctOrder(a, b) {
    //correct if a is parent of b
    return this.compare.greaterThanOrEqual(a,b)
  }
}
class MinHeap extends Heap {
  constructor() {
    super();
    this.kind = "Min";
  }
  correctOrder(a, b) {
    //correct if a is parent of b
    return this.compare.lessThanOrEqual(a,b)
  }
}