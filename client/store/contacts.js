import axios from 'axios'


//ACTION TYPES
const GET_CURRENT_CONTACTS = 'GET_CURRENT_CONTACTS'
const ADD_CONTACTS = 'ADD_CONTACTS'


//ACTION CREATORS

const getContacts = (contacts) => {
  return { type: GET_CURRENT_CONTACTS, contacts }
}

const addContact = (newContact) => {
  return { type: ADD_CONTACTS, newContact }
}

//THUNKS

export const getCurrentContacts = (organizerId) => {
  return dispatch => {
    axios.get('/api/contacts', { params: { organizerId } })
      .then(res => dispatch(getContacts(res.data)))
      .catch(console.error)
  }
}

export const createContact = (contactObj) => {
  return dispatch => {
    axios.post('/api/contacts', {
      name: contactObj.name,
      phone: contactObj.phone,
      organizerId: contactObj.organizerId
    })
      .then(res => dispatch(addContact(res.data)))
      .catch(console.error)
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_CURRENT_CONTACTS:
      return action.contacts
    case ADD_CONTACTS:
      return [...state, action.newContact]
    default:
      return state
  }
}