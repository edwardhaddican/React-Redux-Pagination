## FQL

Functional Query Language: build your own DBMS in Javascript, in node. Javascript practice! Learn about DBMSs. Learn about qurying / query execution.

## DBMS

Database management system: a tool that allows you to abstract away information retrieval. Lets you access / manages "databases".

DBMSs help turn "queries" into persistent changes to our file system (disk).

Examples: Postgres, MySQL, MongoDB, sort-of Excel

## Database

- Persistent information
- Organized
- "Queryable"
- Accessible via code / programming

Are files databases? Sort of! Files are persisten (check), they're "organized" (check), they could be queryable (check), accessible via code (check).

## Query vs. query plan

A *query* a high-level expression (written in text) of **what** we want, whereas a *query plan* is the implementation of a query, **how** the DBMS will do what we want.

SQL is declarative (so are a lot of querying languages). Declarative languages specify **what we want**, imperative languages specify **how to do it**.

My brother (Asaf), submits a query via OmriQL to Omri:

```
- Milk
- Eggs
- Tylenol
- Rabbit food
- Light bulbs
```

What we want! the OmriDBMS makes a query plan:

```
GOTO store ON washington & prospect
SCAN aisles FOR dairy
SCAN aisles FOR eggs
CHECKOUT
GOTO pharmacy ON same corner
SCAN aisles FOR pain meds
CHECKOUT
GOTO pet store BY walking two blocks
SCAN aisles FOR rabbit food
CHECKOUT
```

In real SQL (Postgres), you can see this plan by doing `EXPLAIN QUERY PLAN` followed by your query to get a sense of how it will execute.

## The workshop

How would you build a DBMS? What will it need?

- Query language (API)
- Data (from somewhere)
- Place to put our data
- Way of organizing / structuring that data

The "database" is already provided. The "database" is a folder, where each folder inside that is a table, and each file inside each "table" folder is a "row".

- `Table` class: for persisting information to the filesystem
- `FQL` class: for querying data in tables
- `Plan` class: helps organize information about what the query will do when it executes

Here's what the specs will be executing:

```js
const movieTable = new Table('film-database/movies-table');
const movieQuery = new FQL(movieTable); // the plan is internal to the query
movieQuery
.select('id', 'name')
.where({
  year: 1992
})
.limit(2)
.get(); // executes the query
```

## `fs`

The filesystem module in node, it helps us read / write files.

Normally what we do to read a file:

```js
const fs = require('fs');
// async / non-blocking
fs.readFile('shopping-list.txt', function (err, fileContents) {
  // here's where we do something with the file
});
```

**THIS IS NOT WHAT WE'RE GOING TO DO TODAY**

We will be using `fs.readFileSync`, *blocking*:

```js
const fs = require('fs');
// synchronous / blocking
const fileContents = fs.readFileSync('shopping-list.txt');
// here's where we do something with the file
```

Why? It simplifies our task, makes it easier to code / reason about. Allows us to focus on JS practice, DBMS concepts, without having to worry about async control flow.

## `JSON`

What is it? JavaScipt Object Notation: not really an object. JSON is a text format ("string") that looks like an object.

We can convert a JSON string into an object:

```js
const jsonStr = '{"a": 100}';
console.log(jsonStr.a); // undefined
const dataObj = JSON.parse(jsonStr); // {a: 100}
console.log(dataObj.a); // 100
```

We can convert an object into a JSON string:

```js
const dataObj = {b: 40};
const jsonStr = JSON.stringify(dataObj);
console.log(jsonStr); // '{"b": 40}'
```

Why is JSON useful? Encapsulates data, allows us to convert data into a "serializable" format (text). A format that can be sent to a file, or sent over the internet, etc.

JSON is not only for JavaScript programs. So you can parse / stringify to JSON in python, Java, ruby, etc. JSON is not the only serialization format. Other examples: XML, pkl, yaml.

## Class (static) vs. instance methods

An object-oriented idea (again not specific to JS / sequelize).

```js
const carA = new Car('a8j2l');
carA.accelerate(); // instance method!
const foundCar = Car.findByLicense('a8j2l'); // class method!
```

An instance method is invoked "on an instance" (the thing to the left of the the dot is an instance).

A class method is a invoked "on a class" (the thing to the left of the dot is a class).

Here's how we could define instance and class methods...

```js
const allCars = [];
function Car (license) {
  this.license = license;
  this.speed = 0;
  allCars.push(this);
  // // alternative instance method definition
  // // each instance gets ITS own copy of the function
  // this.accelerate = function () {
  //   this.speed += 10;
  // };
}
// instance method definition
// putting a method on the prototype means that all instances share the same function
Car.prototype.accelerate = function () {
  this.speed += 10;
};
// class method definition
Car.findByLicense = function (searchLicense) {
  for (let i = 0; i < allCars.length; i++) {
    if (allCars[i].license === searchLicense) {
      return allCars[i];
    }
  }
};
```

Here's what wouldn't work...

```js
const allCars = [];
function Car (license) {
  this.license = license;
  this.speed = 0;
  allCars.push(this);
}
Car.prototype.accelerate = function () {
  this.speed += 10;
};
// the line below is "wrong"
Car.prototype.findByLicense = function (searchLicense) {
  for (let i = 0; i < allCars.length; i++) {
    if (allCars[i].license === searchLicense) {
      return allCars[i];
    }
  }
};
const carA = new Car('a8j2l');
// carA {
//   license: 'a8j2l',
//   speed: 0
//   __proto__: {
//     accelerate: function () {...},
//     findByLicense: function () {...}
//   }
// }
// Car {
//   length: 1,
//   name: 'Car',
//   constructor: function () {...},
//   prototype: {
//     accelerate: function () {...},
//     findByLicense: function () {...}
//   },
//   __proto__: Function.prototype,
// }
Car.findByLicense('a8j2l'); // WON'T WORK!
/*
// check own properties
'length' !== 'findByLicense'
'name' !== 'findByLicense'
'constructor' !== 'findByLicense'
'prototype' !== 'findByLicense'
// check __proto__
'bind' !== 'findByLicense'
'call' !== 'findByLicense'
'apply' !== 'findByLicense'
// NOT FOUND
*/
```

With es6 `class` keyword (working):

```js
const allCars = [];
class Car {
  constructor (license) {
    this.license = license;
    this.speed = 0;
    allCars.push(this);
  }
  // instance method
  accelerate () {
    this.speed += 10;
  }
  // class method
  static findByLicense (searchLicense) {
    for (let i = 0; i < allCars.length; i++) {
      if (allCars[i].license === searchLicense) {
        return allCars[i];
      }
    }
  }
}
```

Why? What are we even doing? What's the difference between defining something as a class or instance method? Why choose one over the other?

Instance methods operate on a single instance. Class methods can operate on many instances, or "class-wide" information.

A car factory (real factory) is like our car constructor. A car driving around in the world is like a car instance.

A car factory might be able to lookup certain cars it produced by license plate. This is a thing a "factory" can / should do, because it has access to all cars it created, and is a central point of information about any / all cars.

So it makes sense that "findByLicense" is a thing a factory can do, and that a car cannot do, so it is / should be a *class method*.

It also makese sense that "accelerate" is a thing an instance can do, and that a factory cannot do, so it is / should be an *instance method*.

You all have seen some class methods (in sequelize):

```js
// // our setup code
// const Sequelize = require('sequelize');
// const db = new Sequelize('postgres://....');
// const Comment = db.define('comment', {
//   postedAt: Sequelize.DATE
// });
// ...
// real life examaple of class method
Comment.findAll({where: {postedAt: Date.now()}});
```

## Indexing

Indexing helps us optimize our queries! Specifically it can make repeated queries MUCH faster.

An index in a database is just like index at the back of a textbook.

- The index allows us to find useful information QUICKLY
- It stores "values" (e.g. some text that appears in the textbook. like the word `Charles Law`) as "keys" (e.g. when we go the index, we look thing up such as `Charles Law`)
- It stores "indexes" (e.g. the page numbers) as "values" (as in the page numbers correspond to the kye)
- Our index is itself something we have to build, maintain, and persist

It's a kind of "reverse lookup table".

We can setup indexes in various ways:

- Hashing index: a hash table where the keys are columns values of some kind and values are ids
- Sorted index (more common in the wild): often stored as a search tree

Indexes are really cool! Do have some downsides...

- Maintenance time increases for write operations, any row we create / update / delete we also (may) need to affect a change in any / all of our index tables
- Additional space needed for each index table
- DBMS developer perspective: indexes are copmlicated to utilize / create / develop / code (not true from the perspective of a DBMS user)
- Not ideal for "non-diverse" data (where many columns have the same value)

Indexing is a very powerful idea! This separates "beginner" database admins from "intermediate" database admins.
