/*
 * Testing Environment for Algorithms and Data Structures by StoneT2000
 *
 *
 *
 */
const { PerformanceObserver, performance } = require('perf_hooks');
const seedrandom = require('seedrandom');
const notifier = require('node-notifier');

const {multiplyMatrix, multiplyMatrix2} = require('./multiplyMatrix.js');
const {strassenMatrixMultiply} = require('./strassenAlgorithm.js');
var rng = seedrandom(16);
//SETUP
//RANDOM ARRY
var arr1 = new Array(10);
for (let i = 0 ; i < arr1.length; i++) {
  arr1[i] = Math.floor(rng()*20)*Math.sign(rng() - 0.5);
}
var arr2 = JSON.parse(JSON.stringify(arr1));

//SORTED ARRAY
var arr3 = new Array(10);
for (let i = 0 ; i < arr3.length; i++) {
  arr3[i] = i;
}
var arr4 = JSON.parse(JSON.stringify(arr3));

//RANDOM 2D SQUARE ARRAY/MATRIX
function randomSquareMatrix(n) {
  let A = new Array(n);
  for (let i = 0 ; i < n; i++) {
    A[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      A[i][j] = Math.floor(rng()*10);
    }
  }
  return A;
}
function equalMatrix(A,B){
  if (A.length !== B.length || A[0].length !== B[0].length) {
    return false;
  }
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      if (A[i][j] !== B[i][j]) {
        return false;
      }
    }
  }
  return true;
}
var arr2d_1 = randomSquareMatrix(2048);
var arr2d_2 = randomSquareMatrix(2048);
var arr2d_3 = JSON.parse(JSON.stringify(arr2d_1));
var arr2d_4 = JSON.parse(JSON.stringify(arr2d_2));
/*arr2d_1 = [
  [6,8],
  [1,3]
]
arr2d_2 = [
  [2,1],
  [-6,-1]
]*/
const obs = new PerformanceObserver((list, observer) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {console.log(entry.name + ": " + entry.duration)});
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });

//RECORD RESULTS
console.log("Preparing Run 1")
performance.mark("1");
let res = multiplyMatrix(arr2d_1, arr2d_2);
performance.mark("2");
notifier.notify('Run 1 complete');
performance.measure("Triple Loop Matrix Multiplication", "1", "2"); //Output result 1

console.log("Preparing Run 2")
performance.mark("3")
let res2 = strassenMatrixMultiply(arr2d_3, arr2d_4);
performance.mark("4");
notifier.notify('Run 2 complete');
performance.measure("Strassen's Matrix Multiplication", "3", "4"); //Output result 2

console.log("Results are equal: " + equalMatrix(res,res2))