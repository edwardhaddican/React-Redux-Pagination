# Redux

## Action Types

Action types a string constants that document the type of action that can cause our state to change. It's not necessary to store them in constants, but it's a great convention to do so, because it makes your code more self-documenting, and helps protect you from typos

```javascript
const GOT_PUGS = 'GOT_PUGS'
const UPDATE_PUG = 'UPDATE_PUG'
```

## Actions

Actions are plain JavaScript objects that contain at least a key-value pair for "type" (set to one of our action types), and any other optional information as a payload. These are intended to teach our reducer what change needs to be made.

```javascript
// an "increment count" action
{
  type: INCREMENT_COUNT
}

// a "got pugs" action
{
  type: GOT_PUGS,
  pugs: pugs
}
```

## Action Creators

Remember to write actions every time we want to dispatch them is a pain! It makes our code less DRY, and makes it vulnerable to our own forgetfulness. Instead, by convention we write "action creators" - functions that return actions - so that we don't have to remember what all of our actions look like.

```javascript
// an "increment count" action creator
const increment = () => ({
  type: INCREMENT_COUNT
})

// a "got pugs" action creator
const gotPugs = (pugs) => ({
  type: GOT_PUGS,
  pugs
})
```

## Reducers

The reducer is the function our store uses to determine how the state changes. Whenever we dispatch an action to the store, the reducer is invoked with the previous state and the action, and returns a brand new, updated state object.

The reducer must be a **pure** function - no side effects allowed! This makes it easy to debug when something doesn't look right in our app.

```javascript
const initialState = {
  pugs: []
}

const reducer = (state = initialState, action) {
  switch (action.type) {
    // based on the previous state and the action,
    // return a NEW state
    case GOT_PUGS:
      return {
        ...state,
        pugs: action.pugs
      }
    default:
      return state
  }
}
```

## The Store

The store is like an event emitter with one event - whenever an update is made to the state that it contains.

```javascript
import {createStore} from 'redux'

const store = createStore(reducer)
```

### store.getState

We use store.getState to obtain the current state inside the store.

### store.dispatch

We use store.dispatch to update the state inside the store by sending it actions. Whenever we dispatch, the store takes the action we dispatch and invokes the reducer with the current state. The return value from the reducer is then established as the new state inside the store, and any listeners for store updates are informed (see below).

### store.subscribe

We use store.subscribe to listen for updates to the store. We can register callbacks to the store, which the store will invoke after each state update. This gives us an opportunity to obtain the new state (ex. by using store.getState), so that we can update the UI based on the new state.
