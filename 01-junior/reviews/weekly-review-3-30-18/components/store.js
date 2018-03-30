import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'

const initialState = {
  pugs: []
}

const GOT_PUGS = 'GOT_PUGS'

export const gotPugs = (pugs) => ({
  type: GOT_PUGS,
  pugs
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PUGS:
      return {
        ...state,
        pugs: action.pugs
      }
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    thunks
      .withExtraArgument({axios})
  )
)

export default store
