function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let smallest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[smallest]) {
        smallest = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[smallest];
    arr[smallest] = temp;
  }
}

module.exports = {
  selectionSort
}