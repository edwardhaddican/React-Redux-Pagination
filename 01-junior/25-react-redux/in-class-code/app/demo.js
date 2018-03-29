import React from 'react'
import ReactDOM from 'react-dom'
import store, {increment} from './store' // imported for you already

const connect = (specifyStateIWant, specifyBehaviorIWant) => (OtherComponent) => {
  return class ConnectedToStore extends React.Component {
    constructor () {
      super()
      this.state = store.getState()
    }

    componentDidMount () {
      this.unsubcribe = store.subscribe(() => {
        this.setState(store.getState())
      })
    }

    componentWillUnmount () {
      this.unsubcribe()
    }

    render () {
      const stateIWant = specifyStateIWant(this.state)
      const behaviorIWant = specifyBehaviorIWant(store.dispatch)
      return <OtherComponent {...stateIWant} {...behaviorIWant} />
    }
  }
}

const Counter = (props) => {
  const count = props.count
  const increment = props.increment

  return (
    <div id='container'>
      <div id='counter'>
        <h1>{count}</h1>
        <button onClick={increment}>Increment</button>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    count: state.count
  }
}

const mapDispatch = (dispatch) => {
  return {
    increment: () => dispatch(increment())
  }
}

const ConnectedCounter = connect(
  mapState,
  mapDispatch
)(Counter)

ReactDOM.render(
  <ConnectedCounter />,
  document.getElementById('app')
)
