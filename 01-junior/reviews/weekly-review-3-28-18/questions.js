// QUESTIONS

- synthetic events

- render props (functions as props)
- higher order components
- `props.children`

import './index.css'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// function map (arr, callback) {
//   const newArr = []
//   for (let i = 0; i < arr.length; i++) {
//     newArr.push(callback(arr[i]))
//   }
//
//   return newArr
// }

const List = (props) => {
  const forEach = props.forEach
  const render = props.render
  return (
    <ul>{forEach.map(render)}</ul>
  )
}

class PugsList extends Component {
  state = {
    pugs: [{id: 1, name: 'Cody'}, {id: 2, name: 'Doug'}],
    cats: [{id: 1, title: 'Ms. Bighead'}, {id: 2, title: 'Ms. Winnie'}]
  }

  render () {
    return (
      <div>
        <List
          forEach={this.state.pugs}
          render={(pug) => (<li key={pug.id}>{pug.name}</li>)}
        />
        <List
          forEach={this.state.cats}
          render={(cat) => (<li key={cat.id}>{cat.title}</li>)}
        />
      </div>
    )
  }
}

class Form extends Component {
  state = {
    name: ''
  }

  handleChange = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(this.state.name)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'>Enter name:</label>
        <input type='text' name='name' onChange={this.handleChange} />
        <button type='submit'>submit</button>
      </form>
    )
  }
}

ReactDOM.render(
  <PugsList />,
  document.getElementById('app')
)
