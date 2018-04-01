# Thunks

Thunk middleware adds an extra check for any "actions" that we dispatch. The thunk middleware will check and ask, "is the thing that got dispatched an object, or a function"? If it's an object, it will simply send the object on it's way. If it's a function, it will stop and invoke it, passing the `dispatch` and `getState` methods from the `store` to it.

Thunks are helpful because they remove responsibilty for AJAX and other side effects from our components, making them DRYer, more compact, and easy to test.

## Configuring Thunks
```javascript
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'thunk-middleware'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
```

## Writing Thunks

```javascript
import axios from 'axios'

// thunk/async action creator
export const fetchPugs = () => {
  // thunk
  return async (dispatch, getState) => {
    try {
      const res = await axios.get('/api/pugs')
      const pugs = res.data
      dispatch(receivedPugs(pugs))
    } catch (err) {
      dispatch(receivedError(err))
    }
  }
}

```

## Extra Arguments

We can also include "extra arguments" in addition to `dispatch` and `getState`. These will often be things like our AJAX library, the `history` object, and other things that we want to use for side effects.

```javascript
import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'thunk-middleware'
import axios from 'axios'

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware.withExtraArgument({axios})
    )
  )

// Now, all of our thunks receive an "extra argument" - an object
// with all of the key value pairs we've configured!
// This will make our thunks much easier to test, and we don't have
// to remember to `import axios` everywhere!
const fetchPugs = () => async (dispatch, getState, {axios}) => {
  try {
    const res = await axios.get('/api/pugs')
    const pugs = res.data
    dispatch(receivedPugs(pugs))
  } catch (err) {
    dispatch(receivedError(err))
  }
}
```

