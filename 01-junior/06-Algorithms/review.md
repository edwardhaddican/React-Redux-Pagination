## Spies

```javascript
spyOn(window, 'swap')

// Jasmine's source code:
function spyOn (targetObj, targetFuncName) {
  const originalFunc = targetObj[targetFuncName] // window['swap']

  let numberOfTimesCalled = 0

  function spy (...args) {
    numberOfTimesCalled++
    return originalFunc(...args)
  }

  targetObj[targetFuncName] = spy

  spy.getNumberOfTimesCalled = function () {
    return numberOfTimesCalled
  }
}

```

## Static and Instance Methods

```javascript
// static/class method
// - methods that can be used without creating an instance of the class

const dogStore = []

// old/constructor function way
function Dog (name, breed) {
  this.name = name
  this.breed = breed
  dogStore.push(this)
}

Dog.getAllDogs = function () {
  return dogStore
}

// new class syntax way
class Dog {
  constructor (name, breed) {
    this.name = name
    this.breed = breed
    dogStore.push(this)
  }

  static getAllDogs () {
    return dogStore
  }

  bark () {
    console.log('Arf! I am a dog')
  }
}

// instance method (prototypal methods)
// - methods that only instances of the class can use

const cody = new Dog('Cody', 'pug')

cody.bark()

Dog.getAllDogs()
```
