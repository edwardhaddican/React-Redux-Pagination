import React from 'react'
import ReactDOM from 'react-dom'
import store, {increment} from './store' // imported for you already
import {Provider, connect} from 'react-redux'

const Counter = (props) => {
  return (
    <div id='container'>
      <div id='counter'>
        <h1>{props.count}</h1>
        <button onClick={props.increment}>Increment</button>
      </div>
    </div>
  )
}

const mapState = (state) => ({
  count: state.count
})

const mapDispatch = (dispatch) => ({
  increment: () => dispatch(increment())
})

const ConnectedCounter = connect(mapState, mapDispatch)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>,
  document.getElementById('app')
)
