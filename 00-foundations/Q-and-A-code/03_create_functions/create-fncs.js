function createFunctions (numFuncs) {
  var funcArray = [];

  for (var i = 0; i < numFuncs; i++) {
    (function createFunc () {
      var x = i;
      funcArray.push(function () {
        return x;
      });
    })();
  }

  return funcArray;
}
