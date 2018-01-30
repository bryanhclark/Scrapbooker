import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Import all store functions
import user from './user'
import pictures from './firebase'
import content from './content'
import config from '../../secrets'
import events from './events'
import currentEvents from './currentEvents'

const reducer = combineReducers({ user, pictures, content, events, currentEvents })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))


const store = createStore(reducer, middleware)

export default store

//Export all files here
export * from './user'
export * from './events'
export * from './content'

