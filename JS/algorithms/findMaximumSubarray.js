//BRUTE FORCE METHOD
function findMaximumSubarray(A) {
  let n = A.length;
  if (n === 0) return null;
  let b = 0,c = 0;
  let currentMax = A[0];
  let k = 0;
  for (let i = 0; i < n; i++) {
    let tempSum = 0;
    for (let j = i; j < n; j++ ){
      k++;
      tempSum += A[j];
      if (tempSum > currentMax) {
        b = i;
        c = j;
        currentMax = tempSum;
      }
    }
  }
  console.log("Looped " + k + " times");
  return {b, c, currentMax};
}

//DIVIDE AND CONQUER METHOD
function findMaximumSubarray2(A) {
  
}

//O(N) ALGORITHM METHOD
function findMaximumSubarray3(A) {
  let n = A.length;
  if (n === 0) return null;
  let b = 0,c = 0,t1=0;
  let currentMax = A[0];
  let rightsum = A[0];
  for (let j = 1; j < n; j++) {
    
    //rightsum = Math.max(A[j], rightsum + A[j]);
    if (0 > rightsum) {
      rightsum = A[j];
      t1 = j;
    }
    else {
      rightsum = rightsum + A[j]
    }
    if (currentMax < rightsum) {
      b = t1;
      c = j;
      currentMax = rightsum;
    }
  }
  return {b,c,currentMax};
}
module.exports = {
  findMaximumSubarray,
  findMaximumSubarray2,
  findMaximumSubarray3
}