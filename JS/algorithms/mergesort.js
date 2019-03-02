function merge(arr, p, q, r) {
  let n1 = q - p + 1;
  let n2 = r - q;
  let L = new Array(n1 + 1);
  let R = new Array(n2 + 1);
  
  //Store values into temporary L and R array
  for (let i = 0; i < n1; i++) {
    L[i] = arr[p + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[q + j + 1];
  }
  L[n1] = Infinity;
  R[n2] = Infinity;
  let i = 0;
  let j = 0;
  
  //Replace values in original array arr with the lower of the two values at L[i] and R[j]
  //By now, L[0...n1] and R[0...n2] are sorted and  (Loop Invariant)
  for (let k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i = i + 1;
    }
    else {
      arr[k] = R[j];
      j = j + 1;
    }
  }
}
function merge2(arr, p, q, r) {
  let n1 = q - p + 1;
  let n2 = r - q;
  let L = new Array(n1);
  let R = new Array(n2);
  
  //Store values into temporary L and R array
  for (let i = 0; i < n1; i++) {
    L[i] = arr[p + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[q + j + 1];
  }
  let i = 0;
  let j = 0;
  
  //Replace values in original array arr with the lower of the two values at L[i] and R[j]
  //By now, L[0...n1] and R[0...n2] are sorted and  (Loop Invariant)
  for (let k = p; k <= r; k++) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i = i + 1;
      if (i == L.length){
        for (let t = j; t < R.length; t++) {
          k += 1;
          arr[k] = R[t];
        }
        break;
      }
    }
    else {
      arr[k] = R[j];
      j = j + 1;
      if (j == R.length) {
        for (let t = i; t < L.length; t++) {
          k += 1;
          arr[k] = L[t];
        }
        break;
      }
    }
  }
}
function mergeSort(arr, p, r) {
  if (p < r) {
    //Divide and conquer
    //Perform a merge sort on a sub array, arr[p...q], arr[q+1...r]
    let q = Math.floor((p + r) / 2);
    mergeSort(arr, p, q);
    mergeSort(arr, q + 1, r);
    //By now, arr[p...q] and arr[q+1...r] are sorted (Loop Invariant), and we merge them
    merge(arr, p, q, r);
  }
  return arr;
}
//MergeSort2 doesn't use sentinel cards, but is still slower than MergeSort, which does.
function mergeSort2(arr, p, r) {
  if (p < r) {
    let q = Math.floor((p + r) / 2);
    mergeSort2(arr, p, q);
    mergeSort2(arr, q + 1, r);
    merge2(arr, p, q, r);
  }
  return arr;
}
module.exports = {
  mergeSort,
  mergeSort2
}