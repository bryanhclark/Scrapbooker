import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Import store files here
import user from './user'
import firebase from './firebase'
import events from './events'

const reducer = combineReducers({ user, firebase, events })
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store

//Export all files here
export * from './user'
export * from './events'
