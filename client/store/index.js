import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

//Import all store functions
import user from './user'
import content from './content'
import config from '../../secrets'
import currentEvents from './currentEvents'
import contacts from './contacts'
import singleEvent from './singleEvent'
import participants from './participants'
import comments from './comments'

const reducer = combineReducers({
  user,
  content,
  currentEvents,
  contacts,
  singleEvent,
  participants,
  comments
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))


const store = createStore(reducer, middleware)

export default store

//Export all files here
export * from './user'
export * from './content'

