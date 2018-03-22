# Forms

## Controlled Form Components

```javascript
class MyForm extends React.Component {
  constructor () {
    super()
    // Don't forget to initialize the state of the form inputs!
    // Their names should match the `name` prop on the input they control!
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = (evt) => {
    // As long as the name of the field on state matches the `name` prop on the input,
    // you can write DRY handleChange functions like this. That is, when you have
    // <input name="username"> and listen for its change event,
    // evt.target.name will be "username"

    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    // Don't forget to preventDefault!
    // Otherwise, an evil page refresh will happen :(
    evt.preventDefault()

    // all of our form data is on the state object!
    doSomethingInterestingWith(this.state)
    // this means if we want to "reset" the form, we can just set state:
    this.setState({
      username: '',
      password: ''
    })
  }

  render () {
    // Because our field values are controlled by state,
    // we can easily implement validations. For example, we
    // can calculate whether or not we should disable the submit button
    const shouldDisable = !this.state.username || !this.state.password

    return (
      <form onSubmit={this.handleSubmit}>
        {/* each input needs a value prop with its corresponding value from state */}
        <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
        <input type='text' name='password' value={this.state.password} onChange={this.handleChange}/>
        <button type='submit' disabled={shouldDisable}>Submit</button>
      </form>
    )
  }
}
```

## Uncontrolled Form Components

```javascript
class MyForm extends React.Component {
  // No need for state or change listening.
  // But less work === less control

  handleSubmit = (evt) => {
    evt.preventDefault(evt)
    // instead of controlling the inputs, we get them from the event
    // note that the keys on the evt.target object correspond to the
    // `name` property from the <input> elements
    const username = evt.target.username.value
    const password = evt.target.password.value
    const formData = {username, password}
    doSomethingInterestingWith(formData)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='username' />
        <input type='text' name='password' />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
```
