import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

const giveBlueBackground = (SomeComponent) => (props) => (
  <div className='bg-blue'>
    <SomeComponent {...props} />
  </div>
)

const logClicks = (Component) => (
  class LogsClicks extends React.Component {
    handleClick = () => {
      console.log('You clicked!')
    }

    render () {
      return (
        <div onClick={this.handleClick}>
          <Component />
        </div>
      )
    }
  }
)

class BlueBackground extends React.Component {
  render () {
    return (
      <div className='bg-blue'>
        {this.props.render('hello')}
      </div>
    )
  }
}

const Cody = (props) => (
  <h1>This is Cody: {props.extraMessage}</h1>
)

const BigHead = () => (
  <h1>This is BigHead</h1>
)

const Franklin = () => (
  <h1>This is Franklin</h1>
)

const BlueFranklin = giveBlueBackground(Franklin)
const LoggingFranklin = logClicks(Franklin)

const BlueLoggingFranklin = giveBlueBackground(logClicks(Franklin))

ReactDOM.render(
  <div>
    <BlueBackground render={(theStringHello) => <Cody extraMessage={theStringHello} />} />
    <BlueBackground render={(theStringHello) => <BigHead />} />
    <BlueFranklin />
    <LoggingFranklin />
    <BlueLoggingFranklin />
  </div>,
  document.getElementById('app')
)

// React.createElement(BlueBackground, {OtherComponent: Cody})
