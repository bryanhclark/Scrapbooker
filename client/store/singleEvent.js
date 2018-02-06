import axios from 'axios'

//ACTION TYPE
const GET_SINGLE_EVENT = 'GET_SINGLE_EVENT'

//ACTION CREATOR
export const getSingleEvent = (event) => {
  return { type: GET_SINGLE_EVENT, event }
}

//ACTION THUNK
export const fetchSingleEvent = (eventSecret) => {
  return dispatch => {
    axios.get(`/api/events/${eventSecret}`)
      .then(res => dispatch(getSingleEvent(res.data)))
      .catch(console.error)
  }
}

//REDUCER

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EVENT:
      return action.event
    default:
      return state
  }
}