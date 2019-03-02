const { PerformanceObserver, performance } = require('perf_hooks');
const seedrandom = require('seedrandom');

const {insertionSort, insertionSort2} = require('./insertion.js')
const {selectionSort} = require('./selectionsort.js')
const {mergeSort, mergeSort2} = require('./mergesort.js')
const {binarySearch} = require('./binarysearch.js');
const {linearSearch} = require('./linearsearch.js');
const {findMaximumSubarray, findMaximumSubarray2, findMaximumSubarray3} = require('./findMaximumSubarray.js');
var rng = seedrandom(15296);
//SETUP
//RANDOM ARRY
var arr1 = new Array(10);
for (let i = 0 ; i < arr1.length; i++) {
  arr1[i] = Math.floor(rng()*20)*Math.sign(rng() - 0.5);
}
var arr2 = JSON.parse(JSON.stringify(arr1));

//SORTED ARRAY
var arr3 = new Array(20000);
for (let i = 0 ; i < arr3.length; i++) {
  arr3[i] = i;
}
var arr4 = JSON.parse(JSON.stringify(arr3));

const obs = new PerformanceObserver((list, observer) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {console.log(entry.name + ": " + entry.duration)});
  observer.disconnect();
});


//RECORD RESULTS
console.log(arr1);
performance.mark("1");
//insertionSort(arr1);
//mergeSort2(arr2, 0, arr2.length - 1);
//insertionSort(arr1);

console.log(findMaximumSubarray(arr1));
performance.mark("2");
//insertionSort(arr2);
//selectionSort(arr2);
//mergeSort(arr1, 0, arr1.length - 1);
console.log(findMaximumSubarray3(arr1));
performance.mark("3");
//console.log(arr1);
//console.log(arr2);

//OUTPUT RESULTS
obs.observe({ entryTypes: ['measure'], buffered: true });
performance.measure("findMaximumSubarray brute force", "1", "2")
performance.measure("findMaximumSubarray linear time", "2", "3");