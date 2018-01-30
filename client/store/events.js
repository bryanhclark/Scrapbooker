import axios from 'axios'

// //ACTION TYPES
const ADD_EVENT = 'ADD_EVENT'

// //ACTION CREATORS

const addEvent = (event) => {
  let action = {
    type: ADD_EVENT,
    event
  }
  return action
}

// //THUNKS
export function postEvent (event) {
  return function thunk(dispatch) {
    console.log(typeof event[startTime])
    // return axios.post('/api/events/createEvent', event)
    // .then(res => res.data)
    // .then(newEvent => {
    //   const action = addEvent(newEvent)
    //   return dispatch(action);
    // })
  }
}

// //REDUCER

export default (state = [], action) => {
    switch (action.type) {
        case ADD_EVENT:
            return [...state, action.event]
        default:
            return state
    }
}

