//perform b-search on sorted arr[p...q] looking for target
function binarySearch(arr, target, p, q) {
  let m = Math.floor((p + q)/2);
  if (arr[m] === target) {
    return m;
  }
  else if (p == q) {
    return null;
  }
  else if (arr[m] > target) {
    return binarySearch(arr, target, p, m - 1);
  }
  else {
    return binarySearch(arr, target, m + 1, q);
  }
  return null;
}
module.exports = {
  binarySearch
}