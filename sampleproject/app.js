module.exports = {
  forEach(arr, fn) {
    for (const element of arr) {
      fn(element);
    }
  },
};
