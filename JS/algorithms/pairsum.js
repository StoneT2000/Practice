//Finds
//Complexity O(n + n*log(n)) as we use merge sort to first sort arr in ascending order
//then we make n comparisons to look for a pair that sum to target
const {mergeSort} = require('./mergesort.js');
function pairSum(arr, target) {
  if (arr.length < 2) {
    return false;
  }
  let i = 0;
  let j = arr.length - 1;
  let sorted = mergeSort(arr, i, j);
  console.log(sorted);
  while ( i < j) {
    let sum = arr[i] + arr[j];
    if (sum === target) {
      return true;
    }
    else if (sum > target) {
      j -= 1;
    }
    else if (sum < target) {
      i += 1;
    }
  }
  return false;
}
module.exports = {
  pairSum
}
