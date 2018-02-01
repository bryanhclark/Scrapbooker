import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Import all store functions
import user from './user'
import pictures from './firebase'
import content from './content'
import config from '../../secrets'
import currentEvents from './currentEvents'
import contacts from './contacts'
import singleEvent from './singleEvent'
import participants from './participants'

const reducer = combineReducers({ user, pictures, content, currentEvents, contacts, singleEvent, participants })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))


const store = createStore(reducer, middleware)

export default store

//Export all files here
export * from './user'
export * from './content'

