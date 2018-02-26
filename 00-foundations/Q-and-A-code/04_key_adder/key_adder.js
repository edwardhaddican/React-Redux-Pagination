// function keyAdder () {
  // var total = 0;
// 
  // for (var key in this) {
    // if (this.hasOwnProperty(key) &&
      // typeof this[key] === 'number' &&
      // !Number.isNaN(this[key])) {
        // total += this[key];
    // }
  // }
// 
  // return total;
// }

function keyAdder () {
  return Object.keys(this).reduce((acc, curr) => {
    if (typeof this[curr] === 'number' &&
      !Number.isNaN(this[curr])) {
      return acc + this[curr];
    } else {
      return acc;
    }
  }, 0);
}
