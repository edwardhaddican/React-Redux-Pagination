# React-Redux

By default, React and Redux know nothing about each other. The `react-redux` library allows us to write components that are "connected" to the store in an intuitive way.

```javascript
import React from 'react'
import {connect} from 'react-redux'
import {fetchPugs} from './action-creators'

// receives the latest state from the store as an argument
const mapState = (state) => {
  // returns an object with the key-value pairs we want to become props in the component
  return {
    pugs: state.pugs
  }
}

// receives the dispatch method from the store
const mapDispatch = (dispatch) => {
  // Returns an object with more key-value pairs we want to become props in our component.
  // The advantage of writing functions that dispatch our actions here is that it keeps our
  // components de-coupled from the store itself (i.e. if we didn't do this, we would need
  // to import the store into the modules for all of our components and use it directly, which
  // would give us a headache when we try to test our components!)
  return {
    fetchPugs: () => dispatch(fetchPugs())
  }
}

class Pugs extends React.Component {
  componentDidMount () {
    // now, in our component, we can ues fetchPugs...
    this.props.fetchPugs()
  }

  render () {
    // and the pugs array!
    const pugs = this.props.pugs
    return (
      <ul>
      {
        pugs.map(
          pug => <li key={pug.id}>{pug.name}</li>
        )
      }
      </ul>
    )
  }
}

// Now we have a "smart" component that listens to changes from the store.
// Every time the store updates, our component will invoke `mapState`
// and `mapDispatch` again to get the new set of props for our Pugs component,
// and re-render the Pugs component.
const ConnectedPugs = connect(mapState, mapDispatch)(Pugs)
```
