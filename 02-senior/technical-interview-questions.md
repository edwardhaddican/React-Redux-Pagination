## Q: What is the difference between `var`, `const`, and `let`?
- `var`: declares a variable, not block-scope. "function"-scope

```javascript
function foo () {
  var bar

  if (true) {
    let quux
    bar = 'baz'
    quux = 'quux'
  }
}

function arrayOfFn (n) {
  var arr = []
  for (var i = 0 ; i < n; i++) {
    arr.push(() => console.log(i))
  }
  // sadness ahead...
  return arr
}


function createThingLogger () {
  var thing = 3

  function logThing () {
    console.log(thing)
  }

  thing++

  return logThing
}
```

- `let`: block-scoped
- `const`: block-scoped, cannot re-assign that variable, NOT mean that the value is immutable, const required initialization

## Q: Explain how the event loop works in JavaScript

- JavaScript is single-threaded, but the event loop allows it to be non-blocking: Async operations to be scheduled in the event loop (providing a callback).
- Node is multi-threaded. It executes those asyc actions on a separate thread and queues the invocation of js callbacks when done.


```ruby
def fetchFromDb do
  puts "Fetching the user"
  user = User.findById(8)
  puts "done with this function"
end

fetchFromDb()
puts("End of file")

# Outputs:
# "Fetching the user"
# "done with this function"
# "End of file"
```


```js
async function fetchFromDb(){
  console.log("Fetching the user");
  user = await User.findById(8);
  console.log("done with this function")
}

fetchFromDb();
console.log("End of file");

// Outputs
// "Fetching the user"
// "End of file" (javascript paused the execution of the `fetchFromDb` function but kept executing the code)
// "done with this function"
```

The above example is true and correct, but a little bit convoluted. Let's take a look at a better example:

```js

app.get('/', async(req, res) => {
  res.send(html`<p>Hello</p>`)
})


app.get('/users', async(req, res) => {
  const users = await User.findAll()
  res.send(html`<p>here are the user ${users}</p>`)
})
```

In a non-blocking, single theaded language (Like Javascript). if two requests arrive, one immediately after another, for `/users` and `/`:

Node will:
- Start running the `/users` callback
- Schedule the async operation (fetching from the database) with the event loop.
- start running the `/` callback
- send the `/` response
- Get notified by the event loop that db is done
- send the `/users` response



In a Blocking language, single theaded language, a similar example as above (using Ruby and Sinatra, for example), will:
- Start running the `/users` callback
- stop and wait for the db (Block)
- send the `/users` response
- start running the `/` callback
- send the `/` response


## Q: How does Redux work? What methods are available on a Redux store, and what do they do?

Redux is a data store that behaves like a simple event emitter. The store contains an object representing the state of the app. Actions are dispatched to the store, which are then sent through any registered middleware, and then to the reducer. The reducer is a pure function that calculates the new state object. The store then replaces the old state with the new state, and invokes any callbacks that have been registered with it.

The three most important public methods on the store are: `getState`, `dispatch`, and `subscribe`.

`getState` returns the current state object from the store.
`dispatch` sends an action to the store's middleware pipeline, and eventually to the reducer
`subscribe` takes a callback function that will fire whenever the state inside the store is updated.

## Q: Explain the difference between `call`, `apply`, and `bind`

`call`: invokes a function. The first argument provides the execution context, and subsequent arguments supply arguments to the function.

```js
function add (x, y) {
  return x + y
}

function subtract () {
  return this.x - this.y
}

add.call(null, 2, 3) // 5
subtract.call({x: 6, y: 3}) // 3
```

`apply`: invokes a function. The first argument provides the execution context, and the second argument is an array of arguments to "applied" to the function (i.e. each item in the array will be unpacked into the corresponding argument of the function)

```js
function add (x, y) {
  return x + y
}

function subtract () {
  return this.x - this.y
}

add.apply(null, [2, 3]) // 5
subtract.call({x: 6, y: 3}) // 3
```

`bind`: does not invoke the function - it returns a copy of the function with the execution context bound to the first argument to bind. Any subsequent arguments are partially applied to the copied function

```js
function add (x, y) {
  return x + y
}

function subtract () {
  return this.x - this.y
}

const addTwo = add.bind(null, 2)
addTwo(3) // 5

const getDiff = subtract.bind({x: 6, y: 3})
getDiff() // 3
```

## Q: Explain the prototype chain in JavaScript, and how you can use it to mimic "inheritance"

All objects in JavaScript contain a property called `__proto__`. If you attempt to access a property on an object (ex. `obj.foo`), JavaScript will first check to see if that property exists on the object itself. If it doesn't, it will check the the `__proto__` of that object. It will continue to search for the property up the chain of `__proto__`s until either it finds it, or reaches the `__proto__` for the `Object` object, at which point `undefined` will be returned.

It can be used to mimic "inheritance" because shared behavior for "instances" of a "class" can be placed on an object that will exist up the `__proto__` chain for those object "instances". This pattern can be implemented by using the `new` keyword in conjuction with an ES6 `class`, or by directly attaching those methods to the `.prototype` of the constructor function.

## Q: Explain some common lifecycle methods in React, and how you would use them

`componentDidMount`: this is fired once after a component is initially rendered and mounted on the DOM. It is the recommended place to perform side effects like AJAX to fetch data that the component needs from the server

`componentWillUnmount`: this is fired when a component is "unmounted" (removed) from the DOM. You should use it to clean up things like event listeners or timers (otherwise, you would get a memory leak)

`shouldComponentUpdate`: this is fired when a component receives new props, or when the component's state has changed. You can use the nextProps and nextState to determine whether the component's render method should fire again. If you should, then you return true from the method. If you want to prevent a re-render, return false

## Q: What is the difference between a (contiguous) array and a linked list? What are the advantages/disadvantages of each?

A contiguous array is a set of cells that are physically adjacent in memory. This locality makes it very easy to quickly traverse them. However, you need to know the size of the array beforehand - otherwise, if you end up needing more space, you need to re-allocate a new set of adjacent cells and copy all of the data over into them.

A linked list is a set of cells that are physically dispersed throughout memory. Each cell stores some data, and the link to the next and/or previous cell in the list. This means it takes longer to traverse the list. However, because the cells do not need to be physically adjacent, you can easily add new nodes to the list.

## Q: What is a relational database, and what are it's advantages and disadvantages?

* Data is stored in relational tables
* Primary/foreign key relations
* Use SQL as our means of querying
* ACID-compliant transactions
  * A - Atomicity
  * C - Consistency
  * I - Isolation
  * D - Durability
* "All or nothing"
* Tends to be better at scaling "vertically"
* Harder to scale "horizontally", because you may compromise ACID-qualities, or just be slower
* Need to know what your data looks like ahead of time. Adding/removing columns from a table can be a lot of work.

## Q: Explain the way `this` works in JavaScript

`this` is a keyword that refers to the execution context of a function. It is mostly determined dynamically when the function is is executed. In order of precedence, here are the ways `this` could be determined:

- Arrow functions retain the `this` value of their enclosing lexical context (i.e. the scope in which they're defined).
- Using the `new` keyword will cause `this` to refer to a newly allocated object
- Using `bind` will create a function whose `this` will be set to the object passed in as the first parameter to `bind`
- Using `call` or `apply` will invoke a function with an explicitly set object (passed in as the first parameter to `call` or `apply`)
- Accessing a function as a property on an object and invoking it will implicitly cause `this` to refer to the object
- By default, `this` will refer to the global context (in Node, `global`; in the browser, `window`). In strict mode, `this` will be undefined

## Q: Explain the concept of closures in JavaScript

A closure is the combination of a function and the lexical environment within which that function was declared. A closure is created when a function is returned outside of the scope in which it was declared. This allows a function to "remember" the value of variables from their original environment.

This is very useful writing a "factory" functions (functions that create other functions based on some configuration), as well as modules that keep some data/operations private while revealing only a subset of operations (sometimes referred to as the "revealing module pattern"). However, you should be careful to avoid making closures needlessly - otherwise, you risk wasting memory.

## Q: What is Node, and what are its advantages?

- Node: a JS framework, connects to underlying OS/networking with C/C++ bindings, utilizes the V8 engine for JS execution/binding
- Makes it possible to use JS in the environment of an OS, rather than the browser

* Advantages
  - "non-blocking I/O": async read/write calls without blocking the main execution thread
    - file read/write
    - database read/write
    - OS system events: selecting a file/folder, events being "emitted" from the hard disk, keypresses, audio
    - network read/write || request/response
  - abstraction in JS between you and the operating system
    - makes it possible to program for multiple OS environments if you're already familiar with JS/web
  - for web apps: great to have the full stack in one language
    - if you can debug JS, you know what to do whether you're working on the server/client

* Disadvantages
  - Abstraction between you and operating system
    - less efficient than something lower-level (C)
    - CPU-heavy tasks, it ain't good at
      - JS is higher level, not built for heavy computation
  - Keeping track of features (babel, webpack, javascript fatigue in general)

## Q: What is the difference between "pass by value" and "pass by reference" (aka "pass by copy of a reference" or "pass by sharing a reference") in JavaScript

Primitive types in JavaScript (numbers, strings, booleans, null, undefined, symbols) are passed by value during assignment. This means that when you assign a variable to the value from another variable (either by using the assignment operator, or by sending the value into a function as a parameter), that variable contains a copy of the value - new memory is allocated. However, objects (which includes functions and arrays) are passed by "sharing", which means that the variable contains a copy of a reference to that memory location. This means that you can mutate the data stored at that memory location. However, if you reassign the variable itself, this does not perform a mutation on that memory location - this just points the variable at another value/shared reference.

## Q: What's the difference between == and ===
Both are comparison operator, but the double equal one will not only compare the values but also attempt to coerce the values.The rules by which they do that are complicated and unmemorable, therefore the "triple equal" is simpler and more desirable.

## Q: Explain scope in JS
`Scope` is the name we give to the visibility of variables and other resources in areas of your code.

In JavaScript, functions creates new scope. Variables defined inside a function are in local function's scope and are only accessible inside that function.

JavaScript recently also added block-level scope when declaring variables using `let` & `const`.
Example of Block statements include if and switch conditions or for and while loops.

## Q: How do JavaScript prototypes work?
Every Object in JavaScript has a `Prototype` link pointing to either another Object (or null). When trying to access a property of an object, the property will not only be sought on the object but on the prototype of the object, the prototype of the prototype, and so on until either a property with a matching name is found or the end of the prototype chain is reached.

## Q: What does Object.create do? How is it different that using a constructor function with the new keyword?
Object.create only uses the prototype, not the constructor. In other words, `new X` is `Object.create(X.prototype)` with additionally running the constructor function. (And giving the constructor the chance to return the actual object that should be the result of the expression instead of this.)

## Q: What is a promise? What are the advantages of promises?
A promise is a JavaScript object that represents the eventual result of an asynchronous operation. In other words, it's an object that acts as a placeholder for the future results. A Promise contains a `status` that starts as “pending” and ends up as “fulfilled" or “rejected”.

Advantage of Promises over callbacks: It let your asynchronous code look and behave closer to synchronous code.

## Q: What is Promise.all and when should I use it?
Promise.all returns a single promise that resolves when all of the promises in the argument have resolved (or rejects as soon as any of the passed promises are rejected). It resolves with an array of results, in the same order as the input promises.

Promise.all can be used to make all requests in sequence, rather than in parallel (which would be the case if you use `await` for each one of them).

## Q (React): What are the two sources of data for React components?
Props & State.

Props can be thought as a "component’s configuration". They are received from above and immutable as far as the component receiving them is concerned. State starts with a default value defined in the component’s constructor and then suffers from mutations in time. A component manages its own state internally, and every time the state changes, the component is rendered again.


## Q: (Redux): What is Redux and why should I use it?
Redux is used for application state management. Redux maintains the state of an application in a single immutable state tree (a plain JS object), which can’t be changed directly. When something changes, a new object is created (using actions and reducers).

Reasons to use Redux:
  * Predictability of outcome (There is always one source of truth, the store, with no confusion about how to sync the current state with actions and other parts of the application.)
  * Maintainability (Having a predictable outcome and strict structure makes the code easier to maintain.)
  * Easy of debug (State changes are traceable - everything going on in the app is trackable in real time.)
  * Ease of testing (Redux parts of your code are mostly made of small, pure and isolated functions).


## Q (Redux): What are Actions in Redux? How are Actions defined?
"Actions" in Redux are just plain objects with a `type` key. 

As far as the rest of the application is concerned, the Redux store is read-only - Only the store can update its state, but it provides a mechanism by which any other part of the application can indicate that the state needs to change: dispatching actions.

Dispatching an action is like sending a message to the store saying that something happened and that the store should update itself in response. 
