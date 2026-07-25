function findKthPositive(arr, k) {
  let missingNumbers = [];
  let currentNumber = 1;
  let index = 0;

  while (missingNumbers.length < k) {
    if (index < arr.length && arr[index] === currentNumber) {
      index++;
    } else {
      missingNumbers.push(currentNumber);
    }
    currentNumber++;
  }

  return missingNumbers[k - 1];
}

console.log(findKthPositive([1, 2, 3, 4], 2));
