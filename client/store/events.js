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
export const createEvent = (eventObj) => {
  return dispatch => {
    axios.post('/api/events', eventObj)
      .then(res => console.log(res.data))
      .catch(console.error)
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

