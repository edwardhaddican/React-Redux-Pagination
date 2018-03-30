import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import store, {gotPugs} from './store'

const PUGS = [
  {
    id: 1,
    name: 'Cody'
  },
  {
    id: 2,
    name: 'Doug'
  },
  {
    id: 3,
    name: 'Penny'
  }
]

const PugList = (props) => {
  const pugs = props.pugs
  const getPugs = props.getPugs

  return (
    <div>
      {
        pugs.map(pug => (
          <div key={pug.id}>{pug.name}&</div>
        ))
      }
      <button onClick={getPugs}>GET PUGS!</button>
    </div>
  )
}

const mapState = (state) => {
  return {
    pugs: state.pugs
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPugs: () => {
      const action = gotPugs(PUGS)
      dispatch(action)
    }
  }
}

const ConnectedPugs = connect(mapState, mapDispatch)(PugList)

ReactDOM.render(
  <Provider store={store}>
    <div id='demo' className='fill-xy bg-purple white column center-xy'>
      <ConnectedPugs />
    </div>
  </Provider>,
  document.getElementById('app')
)
