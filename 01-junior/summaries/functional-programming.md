# Functional Programming

Functional programming is a programming paradigm, which is best understood as a collection of language features. Here are some of the most important features of functional programming:

* pure functions
* curried functions
* immutable data structures
* recursion

## Pure functions

A function is pure if has:
  * No side effects or state
  * No external dependencies (uses something that hasn't been given as an argument to the function)

In functional programming, most operations must be pure. Pure functions are easy to test and predict. Side effects are unavoidable at some point (i.e. network requests, changing the DOM), but we use various strategies to quarantine these as much as possible so that they're easier to deal with when something goes wrong.

```javascript
const externalState = {counter: 0}

const foo = () => {
  externalState.counter++ // Impure! This is an external dependency
}

foo()
```

```javascript
const externalState = {counter: 0}

const foo = (state) => {
  state.counter++ // Still impure! Mutating an object is a side effect!
}

foo(externalState)
```

```javascript
const externalState = {counter: 0}

const foo = (state) => {
  // Pure! No side effects, mutations, or external dependencies!
  return Object.assign({}, state, {counter: state.counter + 1})
}

const newState = foo(externalState)
```

## Curried functions

Rather than write functions that accept multiple arguments, functional languages simply compose multiple `unary` functions together (**unary**: functions that only take one argument). This process is called "currying" (named after Haskell Curry, _not_ the savory stew).

```javascript
// instead of this:
const add = (a, b) => a + b

// we say this:
const add = a => b => a + b
```

This is advantageous because it allows use to more easily compose and reuse the functions we've curried.

```javascript
// Reusability:
const add = a => b => a + b
const add3 = add(3)
const nine = add3(6) // 9
const seven = add3(4) // 7

// composability
const map = cb => arr => arr.map(cb)
const filter = cb => arr => arr.filter(cb)

const isOdd = n => n % 2 !== 0

// reads: filters the list to only odd numbers, then adds 3 to each
compose(map(add3), filter(isOdd))([1, 2, 3]) // [4, 6]
```

## Immutable data structures

Rather than mutate our data structures, what if every operation returned a new version? This is idea behind immutable data structures.

```javascript
import {Map, List} from 'immutable'

const l1 = new List()
const l2 = l1.push(5) // List [5]
const l3 = l2.push(9) // List [5, 9]

const m1 = new Map()
const m2 = m2.set('a', 1) // Map {a: 1}
const m3 = m3.set('b', 1) // Map {a: 1, b: 2}
```

## Recursion

Rather than using iteration (`for` and `while` loops), functional techniques employ recursion. Remember that any problem that can be solved iteratively can also be solved recursively, and vice-versa.

```javascript
// imperative
function factorial (n) {
  let result = 1
  for (let i = 1; i <= n; i++) {
    result = result * i
  }
  return result
}

// functional
const factorial = (n) => {
  return n === 1 ? n : n * factorial(n - 1)
}
```
