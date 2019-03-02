class PriorityQueue extends MinHeap {
  
  constructor() {
    super();
    this.priorities = {};
    this.compare = new Comparator(this.comparePriority.bind(this));
    //Now the MinHeap compares by this comparator instead.
    //Remember, this Comparator processes the values, 1, 0, -1 from comparison functions such as comparePriority and returns true or false for various operations. This allows for the heap data structure to be easily abstracted and allows ordering by various heuristics.
  }
  //Return 0 if priorities are equal, and using Comparator class, this allows for boolean return with compare.equal(a,b) of whether a === b in this data structure.
  //Return -1 if index1 is higher priority and vice versa.
  
  isEmpty() {
    if (this.queue.length) {
      return false;
    }
    return true;
  }
  add(item, priority = 0) {
    this.priorities[item] = priority;
    //add the way minheap adds, which is the same as heap
    super.add(item);
  }
  remove (item, comparison_function) {
    //We give argument for custom comparison_function because you may want to remove elements based on something else (e.g by priority or by value). To do by priority, use this.compare etc.
    super.remove(item, comparison_function);
    delete this.priorities[item];
  }
  comparePriority (index1, index2) {
    if (this.priorities[index1] === this.priorities[index2]) {
      return 0;
    }
    return this.priorities[index1] < this.priorities[index2] ? -1 : 1
  }
  compareValue (a,b) {
    if (a === b){
      return 0;
    }
    return a < b ? -1 : 1;
  }
  findByValue (item) {
    return this.find(item, new Comparator(this.compareValue));
  }
  
  
}