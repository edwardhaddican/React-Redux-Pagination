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

- JavaScript is single-threaded. JavaScript allows for async actions to be passed to the event loop call stack.
- Node/browser are multi-thread. It schedules the exectuion of those asyc actions and queues the invocation of callbacks when done.


```ruby
def fetchFromDb do
  puts "Fetching the user"
  user = User.findById(8)
end

fetchFromDb()
puts("End")
```


```js
async function fetchFromDb(){
  console.log("Fetching the user");
  user = await User.findById(8);
  console.log("done with this function")'
}

fetchFromDb();
console.log("End");
```

```js

app.get('/', async(req, res) => {
  res.send(html`<p>Hello</p>`)
})


app.get('/users', async(req, res) => {
  const users = await User.findAll()
  res.send(html`<p>here are the user ${users}</p>`)
})
```


In a non-blocking, single theaded language
In the above example, if two requests arrive, one for /users and one for /:

- Start running the /users callback
- Schedule the async operation with the event loop
- start running the / callback
- send the / response
- Get notified by the event loop that db is done
- send the /users response



In a Blocking language, single theaded language
- Start running the /users callback
- stop and wait for the db
- send the / response
- start running the / callback
- send the / response


## Q: How does Redux work? What methods are available on a Redux store, and what do they do?

## Q: Explain the difference between `call`, `apply`, and `bind`

## Q: Explain the prototype chain in JavaScript, and how you can use it to mimic "inheritance"

## Q: Explain some common lifecycle methods in React, and how you would use them

## Q: What is the difference between a (contiguous) array and a linked list? What are the advantages/disadvantages of each?

## Q: What is a relational database, and what are it's advantages and disadvantages?

## Q: Explain the way `this` works in JavaScript

## Q: Explain the concept of closures in JavaScript

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
