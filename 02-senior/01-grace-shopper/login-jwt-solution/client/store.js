import {createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

const initialState = {
  user: {}
}

const GET_USER = 'GET_USER'

const gotMe = (user) => ({
  type: GET_USER,
  user
})

export const getMe = () => dispatch => {
  const token = window.localStorage.getItem('token')
  const headers = {'x-access-token': token}
  return axios.get('/auth/me', {headers})
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console))
}

export const login = (formData) => dispatch => {
  return axios.post('/auth/login', formData)
    .then(res => res.data)
    .then(({user, token}) => {
      window.localStorage.setItem('token', token)
      dispatch(gotMe(user))
    })
    .catch(console.error.bind(console))
}

export const logout = () => dispatch => {
  window.localStorage.removeItem('token')
  return axios.delete('/auth/logout')
    .then(() => dispatch(gotMe(initialState.user)))
    .catch(console.error.bind(console))
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}

export default createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware))
