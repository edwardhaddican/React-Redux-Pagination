function Laptop (year, size) {
  this.year = year;
  this.hd = size;
}

Laptop.prototype.checkSpecs = function () {
  return 'Year: ' + this.year + ', HD: ' + this.hd;
};

function Macbook (year, size, color) {
  Laptop.apply(this, [year, size]);
  this.color = color;
}

function extendWithObjectCreate (child, parent) {
  child.prototype = Object.create(parent.prototype);
}

function extendWithNewKeyword (child, parent) {
  child.prototype = new parent;
}
