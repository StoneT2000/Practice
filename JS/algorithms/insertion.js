//sorting ascending
function insertionSort(arr) {
  
  for (let j = 0; j < arr.length; j++) {
    let key = arr[j];
    let i = j - 1;
    while (i >= 0 && arr[i] > key) {
      arr[i + 1] = arr[i];
      i = i - 1;
    }
    arr[i + 1] = key;
  }
  
  return arr; 
}

function insertionSort2(arr) {
  for (let j = 0; j < arr.length; j++) {
    let key = arr[j];
    let i = j - 1;
    let k = binarySearchBounded(arr.slice(0,j), key, 0, j);
    for (;i >= k; i--) {
      arr[i + 1] = arr[i];
    }
    arr[k] = key;
  }
  return arr;
}
//performs b search for first pair arr[k], arr[k+1] such that key is between arr[k], arr[k+1] inclusive
function binarySearchBounded(arr, key, p, q) {
  let m = Math.floor((p + q)/2);
  if (arr[m - 1] <= key && arr[m] >= key) {
    return m;
  }
  else if (m === 0 && arr[m] >= key) {
    return m;
  }
  else if (m === arr.length - 1 && arr[m] <= key) {
    return m + 1;
  }
  else if (arr.length === 0) {
    return 0;
  }
  else if (p == q) {
    return null;
  }
  else if (arr[m] > key) {
    return binarySearchBounded(arr, key, p, m - 1);
  }
  else {
    return binarySearchBounded(arr, key, m + 1, q);
  }
  return null;
}
module.exports = {
  insertionSort,
  insertionSort2
}