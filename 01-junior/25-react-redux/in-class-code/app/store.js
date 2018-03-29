import {createStore} from 'redux'

// action type
const INCREMENT_COUNT = 'INCREMENT_COUNT'

// action creators
export const increment = () => ({
  type: INCREMENT_COUNT
})

// initial state
const initialState = {
  count: 0
}

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1
      }
    default:
      return state
  }
}

const store = createStore(reducer)

export default store
