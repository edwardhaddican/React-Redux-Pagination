import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

class CodySaver extends React.Component {
  shouldComponentUpdate (nextProps) {
    return this.props.name !== nextProps.name
  }

  render () {
    return <Cody {...this.props} />
  }
}

const Cody = (props) => {
  console.log('rendering: ', props)
  const name = props.name
  return <div>{name}</div>
}

const Main = class extends React.Component {
  state = {
    count: 0
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render () {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.increment}>Click me</button>
        <CodySaver name='cody' />
      </div>
    )
  }

}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
