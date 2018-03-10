const fs = require('fs');
const path = require('path');

// function Table (folderPath) {
//   // _ here is naming convention to signify "internal" data
//   this._folderPath = folderPath;
// }

// Table.toFilename = function (id) {
//   const filename = id + '.json';
//   return filename;
// };

// Table.toId = function (filename) {
//   const id = filename.slice(0, -5);
//   return id;
// };

// Table.prototype.read = function (id) {
//   const filename = Table.toFilename(id);
//   // path.join is (a little) better because it is cross-platform
//   const filepath = path.join(this._folderPath, filename);
//   if (!fs.existsSync(filepath)) return undefined;
//   const filecontents = fs.readFileSync(filepath);
//   const row = JSON.parse(filecontents);
//   return row;
// };

// // // notes about functions
// // function increment (num) {
// //   return num + 1;
// // }
// // function callIncrement (num) {
// //   return increment(num);
// // }
// // increment(4); // 5
// // callIncrement(4); // 5
// // // same behavior
// // // callIncrement is unnecessary

// // // but watch out if the original function (increment) uses `this`
// // const obj = {
// //   counter: 0,
// //   increaseCounter: function (num) {
// //     this.counter += num;
// //   }
// // };
// // const arr = [5, 10, 100];
// // // this works
// // arr.forEach(function (num) {
// //   obj.increaseCounter(num);
// // });
// // // this doesn't
// // arr.forEach(obj.increaseCounter);
// // // how does `this` get defined
// // // (some different rules if we're using `new`, `call`/`apply`/`bind` or arrow functions)
// // // on line 51, `obj.increaseCounter(num)`, `increaseCounter` will get invoked with its `this` set to `obj`
// // // on line 54, `obj.increaseCounter` is NOT GETTING invoked
// // // ...which means we don't know what the `this` will be
// // // often times higher order functions like `forEach` allow you to specify a `this` for the callback you pass in
// // // we could solve the above problem with...
// // arr.forEach(obj.increaseCounter, obj);

// // // but watch out the original function takes more arguments than you expect
// // const arr = ['5', '10', '100'];
// // // this works
// // const numsOne = arr.map(function (str) {
// //   return parseInt(str);
// // });
// // // this doesn't
// // const numsTwo = arr.map(parseInt);
// // // what really happened was...
// // const numsThree = arr.map(function (str, index, arr) {
// //   // convert the str to a number in base index
// //   return parseInt(str, index, arr);
// // });

// Table.prototype.getRowIds = function () {
//   const filenames = fs.readdirSync(this._folderPath);
//   // point-free notation / tacit programming
//   const ids = filenames.map(Table.toId);
//   return ids;
// };

// exact same thing, but in es6 `class` syntax
class Table {
  constructor (folderPath) {
    // _ here is naming convention to signify "internal" data
    this._folderPath = folderPath;
  }
  static toFilename (id) {
    const filename = id + '.json';
    return filename;
  }
  static toId (filename) {
    const id = filename.slice(0, -5);
    return id;
  }
  read (id) {
    const filename = Table.toFilename(id);
    // path.join is (a little) better because it is cross-platform
    const filepath = path.join(this._folderPath, filename);
    if (!fs.existsSync(filepath)) return undefined;
    const filecontents = fs.readFileSync(filepath);
    const row = JSON.parse(filecontents);
    return row;
  }
  getRowIds () {
    const filenames = fs.readdirSync(this._folderPath);
    // point-free notation / tacit programming
    const ids = filenames.map(Table.toId);
    return ids;
  }
}

module.exports = Table;
