# Functional Programming

## What is functional programming?

* Style of programming that emphasizes immutability
* A programming "paradigm"
* Does not modify state or "state", same output for the same input
* Modular, composability ("composition over inheritance")
  * Don't create complicated hierarchies of classes
  * Package functionality into small units, layer or "compose" them together
  * Favor "has-a" relationships over "is-a" relationships
* "Puritanical"...in that it's pure ;)
  * Sometimes insufferable adherents
  * Zealotism to be avoided

## Why is functional programming so popular in JavaScript?

* More predictability: paradigm based on small pure functions
  * Easy to test
  * Idempotent
  * Greater confidence as you grow
* School of hard knocks
  * We deal a lot with stateful things like interfaces
* JS is the language of the web, so we sort of have to use it, which means that if we want to do FP in JS, we have to implement it
* Because you can
* Community-inclusive
  * `class` syntax
  * Positive: folks from many different backgrounds can get into js very easily
  * Negative: js gets kind of unweidly, perhaps harder to learn deeply
    * Problems with stylistic portability
* FP: easier to read/understand?

## Features of functional programming

* Immutability

  * How do we implement this in JS?
    * Never "edit" input
      * Magneto's mutants: `push`, `splice`, `pop`, `shift`, `unshift`, `sort`
      * X-men: `Object.assign`, `Object.freeze`, write a container, `slice`, `...`
  * Why is it useful/where have we seen this in the "wild"?
    * Redux/React: to manage state in a predictable way
      * with Redux: changes are "quarantined"
      * easier reasoning about updates as time goes on
      * time travel for free!

* Function composition

  * How do we implement this in JS?
    * require('ramda'), use a utility function

```javascript
const f = (x) => x + 1
const g = (x) => x * 2


const compose = (f, g) => x => f(g(x))

const func = compose(f, g)
func(2) // 5
```

* Currying

  * Arguments passed in...partially/individually
  * "partial application" of functions
  * How do we implement this in JS?
    * Use => and write our functions in a particular way
      * const add = (a, b, c) => a + b + c
      * const add = a => b => c => a + b + c // add(1) => add1(2) => add1and2(3) => 6
                                             // add(1)(2)(3)
      * const add = (a) => {
        return (b) => {
          return (c) => {
            return a + b + c
          }
        }
      }
      * use a utility functions (or require ramda)

* Chaining/mapping/"functors"
  * [1, 2, 3].map(a => a + 1) // => [2, 3, 4]
  * [a].map(f) // => [b]
  * [a].concat([b]) // => [a, b]
  * P(a).then((a) => b) // => P(b)
* Absence of `if`/`for`/`while`
* Testability
