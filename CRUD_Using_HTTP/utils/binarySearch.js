function binarySearch(users, id) {
  let left = 0;
  let right = users.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (users[mid].id === id) {
      return mid;
    }

    if (users[mid].id < id) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

module.exports = binarySearch;
