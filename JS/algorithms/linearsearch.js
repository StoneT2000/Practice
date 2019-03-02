function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    let key = arr[i];
    if (key === target) {
      return i;
    }
  }
  return null;
}
module.exports = {
  linearSearch
}