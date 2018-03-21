## Anatomy of a test spec

```javascript
describe('Pug class', () => { // test suite - organizes a group of test cases

  let pug // a common strategy for dealing with dummy data in a DRY manner is to declare
         // a variable in an upper scope, and then assign it in a hook like "beforeEach"

  beforeEach(() => { // hook
    // Used to clean up after a test case
    // and then set up for the next one.
    // Runs "before each" it block
    pug = new Pug('cody')
  })

  it('is cute', () => { // test case/spec - tests one unit of code
    expect(pug.isCute).to.be.equal(true) // expectation
  })
})
```

## Async test specs

### Using callbacks and `done`

```javascript

it('does something async', (done) => { // you MUST specify `done` as a parameter - otherwise mocha won't know that you're doing something async!
  fs.readFile('file.txt', 'utf8', (err, data) => {
    expect(err).to.be.undefined
    expect(data).to.be.equal('Hello world')
    done() // don't forget to call done!
  })
})

```

### Using promises
```javascript

it('does something async', () => { // do NOT specify `done`

  return promisifiedReadFile('file.txt', 'utf8') // you MUST return a promise!
    .then(data => {
      expect(data).to.be.equal('Hello world')
    })
})

```

### Using async/await

```javascript

it('does something async', async () => { // don't forget the `async` keyword!

  // Ah, so nice! We just need to await
  const data = await promisifiedReadFile('file.txt', 'utf8')
  expect(data).to.be.equal('Hello world')
})

```


## Spies

* A **spy** records information about a function's usage, such as the arguments it was invoked with, how many times it's been invoked, or even whether it throws an error. It's useful for *observing* - when you care about the function's usage/history, but not necessarily the consequences of its invocation.

* A **stub** is like a spy, but allows pre-programmed outputs. It's especially useful for *ensuring predictability* - when your function might depend on the unpredictable outcome of another function.

* A **mock** is like a stub, but on an entire object rather than specific functions. It applies both "observing" functionalities and "faking" functionalities onto all methods on the object. Usually, mocks also have assertion/expectation functionalities built in. It's useful for making sure many parts of a whole interact correctly.

```javascript
// in the mocha/chai ecosystem, we often use `sinon` for spies
const sinon = require('sinon')

// let's test and make sure that the myForEach function actually uses its callback
const myForEach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i])
  }
}

describe('myForEach', () => {

  it('invokes the callback function', () => {
    // creates a dummy spy function
    const spiedOnCallback = sinon.spy()

    // we invoke `myForEach` and pass in the spy as the callback
    myForEach([1, 2, 3], spiedOnCallback)

    expect(spiedOnCallback.called()).to.be.true
  })

})

// what if we want to spy on a method on an object?
const pug = {
  name: 'Inspector Cody',
  description: 'A pug wearing a detective hat',
  sayName () {
    console.log(this.name)
  }
}

describe('spying on sayName', () => {

  it('not a realistic test case', () => {
      // We invoke sinon.spy, passing in the object as the first argument,
      // and the string identifier of the method we want to spy on as the second argument.
      // Now, `pug.sayName` is now being "spied on".
      // The return value is a reference to the spy itself, so we store that in a variable
      // so we can use it later
      const spy = sinon.spy(pug, 'sayName')

      pug.sayName()

      expect(spy.called()).to.be.true
  })
})
```
