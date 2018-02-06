import axios from 'axios'

//ACTION TYPE
const GET_CURRENT_CONTACT = 'GET_CURRENT_PARTICIPANT'

//ACTION CREATORS
const getCurrentContact = (contact) => {
  return { type: GET_CURRENT_CONTACT, contact }
}

//THUNKS

export const fetchCurrentContact = (contactHash) => {
  return dispatch => {
    axios.get('/api/contacts', { params: { contactHash } })
      .then(res => dispatch(getCurrentContact(res.data[0])))
      .catch(console.error)
  }
}


export default (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_CONTACT:
      return action.contact
    default:
      return state
  }
}