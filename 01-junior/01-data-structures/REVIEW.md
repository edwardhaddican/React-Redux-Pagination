# QUESTIONS

## Linked List
x Search in Linked List: what is the argument in the spec?
x RemoveHead and removeTail: what references are being passed around?
x Visualizing how instances get created, application of creating object instances
x Let's discuss distinction between the LinkedList container and the individual nodes

## Es6
- ES6: arrow functions when used inside callbacks, what is the value of `this`


const func = (arg1, arg2) => 1 + 1

const whatIsthis = () => {
  console.log(this)
}

0. Default

whatIsThis() // undefined, global context (window)

1. Implicit

const someObj = {}
someObj.whatIsThis = whatIsThis

someObj.whatIsThis() // someObj

2. Explicit

// call, apply, bind
whatIsThis.call(someObj)

3. `new` keyword

const instanceOfAThing = new whatIsThis()

4. lexically (=>)

// in this scope, what is this? global

  const someObj = {
    foo () {
      // what is this here? someObj
      const arrowThis = () => console.log(this)
        [1, 2, 3].forEach((item) => {
          this.doSomething(item)
        })
      arrowThis()
    }
  }

  someObj.foo()







