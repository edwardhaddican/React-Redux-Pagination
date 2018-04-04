# STUDY GUIDE

This study guide is intended to help focus your studying for the senior checkpoint. It is necessarily exhaustive, nor should it be your only point of reference.

## JAVASCRIPT

### Topics to Review
- Array.prototype methods (map, filter, reduce)
- Function.prototype methods (call, apply, bind)
- Scope and closures
- Execution context (`this`)
- Higher order functions (i.e. functions that take/return other functions)
- Variadic functions (i.e. functions that take any number of arguments)
- The `new` keyword

### Suggested Resources
- [Advanced Javascript](https://learn.fullstackacademy.com/workshop/57a21d1d39616e0300f91dd6/landing)
- [Essential ES6](https://learn.fullstackacademy.com/workshop/5844439180a5560004e6e1c8/landing)
- [Codewars](https://www.codewars.com)
- [Cody's Cafe](https://github.com/FullstackAcademy/codys-cafe)

---

## EXPRESS

### Topics to Review
- Organizing middleware
  - `app.use` vs `app.get`/`app.post`/etc
  - Using a `Router`
  - Mounting middleware on specific paths
- Interacting with request data
  - `req.param` vs. `req.body` vs. `req.query`
  - `req.param`: parses wildcard router params
    - Ex. If your route handler is: `router.get('/pugs/:pugId')`, and someone makes a request for "GET /pugs/1", then `req.params.pugId` will be "1"
  - `req.body`: parses the request body (POST and PUT only)
    - Ex. If your route handler is `router.post('/pugs')`, and someone makes a request for "POST /pugs" with a request body of "{name: 'Cody'}", then `req.body` will be `{name: 'Cody'}`
  - `req.query`: parses the querystring (usually GET, but allowed for any verb)
    - Ex. If your route handler is `router.get('/pugs')`, and someone makes a request for "GET/pugs?color=fawn", `req.query` will be `{color: 'fawn'}`
- Sending json data
  - Using Sequelize models to obtain data and repond to requests (see below)
  - Properly handling asynchronous control flow in routes
  - Setting response status (ex. `res.status(201).json(newlyCreatedThing)`)
- Error handling
  - Using `next` to handle control flow and errors
  - How to define error handling middleware (4 parameters: `err, req, res, next`)

### Suggested Resources
- [Gist: Express Intro](https://gist.github.com/tmkelly28/e00d4e4b8d38b9605706e107741a11e6)
- [Express docs](http://expressjs.com/)

---

## SEQUELIZE

### Topics to Review
- Defining models
  - Defining columns
    - Basic data types (STRING, TEXT, INTEGER, FLOAT, BOOLEAN, ARRAY)
    - Validations
      - `allowNull`, and common `validate` options (`max`, `min`, `notEmpty`)
    - Default values
  - Class methods
  - Instance methods
  - Hooks
- Associations
- Queries and operations
  - Built-in class methods
    - `Model.findAll`
    - `Model.findById`
    - `Model.findOne`
    - `Model.create`
    - `Model.update`
    - `Model.destroy`
  - Built-in instance methods
    - `instance.update`
    - `instance.destroy`
  - Using operators (`Op.gt`, `Op.lt`, `Op.eq`, `Op.ne`, `Op.contains`)
  - Eager loading (`include`)

### Suggested Resources
- [Fullstack Sequelize Guide](https://sequelize-guides.netlify.com/)
- [Sequelize docs](http://docs.sequelizejs.com/)
- [List of operators](http://docs.sequelizejs.com/manual/tutorial/querying.html#operators)
- [List of validations](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations)
- [Gist: Sequelize Associations](https://gist.github.com/joedotjs/4a57c5e2037fa15a25fe52131a21ae91)

---

## REACT

### Topics to Review
- Defining components
  - Class components (`class Pugs extends React.Component { /* etc */ }`)
    - requires a `render method`
    - can use lifecycle hooks
    - can define other prototype and/or static methods
    - can be stateful
    - accesses props via `this.props`
  - Functional components (`const Pugs = (props) => { /* etc */ }`)
    - returns the JSX it renders
    - accesses props via `props` argument
- Defining and setting state
  - Defined in `constructor` OR via class property
  - Always initialize state values with an appropriate data type
- Passing props
  - Syntactically similar to HTML properties
    - ex. `<PugsList pugs={this.state.pugs} />`
  - Passing everything down using the spread operator
    - ex. `<Foobar {...this.state} {...this.props} />`
- JSX
  - Using `.map` to map over collections of data
  - Using the `key` prop with collections
  - Using logical operators for conditional rendering (`&&`, `||`, ternary control operator)
- Forms and events
  - Event handlers must be bound in constructor (OR, use class properties)
  - Controlled form components vs. uncontrolled form components
  - Attaching handlers to `onChange`, `onSubmit`, `onClick`
    - Writing DRY change handlers
      - Need to specify a `name` on inputs (`<input name='password' />`) that matches the value on state
      - In the change handler, use `this.setState({ [evt.target.name]: evt.target.value })`
    - Remember to `evt.preventDefault()` for submit events

## Suggested Resources
- [React documentation](https://reactjs.org/docs/hello-world.html)
- [Gist: Handling Multiple Form Inputs](https://gist.github.com/tmkelly28/09f608984cf79d2eee718773f519a4d1)

---

## REDUX

### Topics to Review
- Defining action types and actions
  - action types: a string constant representing a change (ex. `const ADD_PUG = 'ADD_PUG'`)
  - action: a JavaScript object with at least a type, and an optional payload (ex. `{type: ADD_PUG, pug}`)
- Defining action creators
  - action creator: a function that returns an action (ex. `const addPug = (pug) => ({type: ADD_PUG, pug})`)
- Defining reducers
  - Initializing state (e.g. `const reducer = (state = initialState, action) => { /* etc */}` )
  - Conditional logic based on action type
  - Maintaining functional purity
    - No side effects or mutations
    - Using `Object.assign` or the object spread operator to clone objects
    - Using `concat`/`slice` or the array spread operator to clone arrays

### Suggested Resources
- [Redux documentation](https://redux.js.org/)
- [Gists: Redux From Scratch](https://learn.fullstackacademy.com/workshop/5ab51fb58b62ab0004347043/content/5ab6b1b326dbca0004d8b8d1/text)
