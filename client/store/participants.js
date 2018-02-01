import axios from 'axios'

//ACTION TYPE
const GET_PARTICIPANTS = 'GET_PARTICIPANTS'
const ADD_PARTICIPANTS = 'ADD_PARTICIPANTS'


//ACTION CREATOR
const getPartipants = (participants) => {
  return { type: GET_PARTICIPANTS, participants }
}

export const addParticipants = (participant) => {
  return { type: ADD_PARTICIPANTS, participant }
}



//THUNK

export const fetchPartipants = (eventId) => {
  return (dispatch) => {
    axios.get('/api/participants', { params: { eventId } })
      .then(res => dispatch(getPartipants(res.data)))
  }
}

export const addParticipantsToEvent = (participantsArray, eventId) => {
  return (dispatch) => {
    Promise.all(participantsArray.map(participant => {
      axios.post('/api/participants', { contactId: participant.id, eventId })
        .then(res => dispatch(addParticipants(res.data)))
    }))

  }
}


//REDUCER

export default (state = [], action) => {
  switch (action.type) {
    case GET_PARTICIPANTS:
      return action.participants
    case ADD_PARTICIPANTS:
      return [...state, action.participant]
    default:
      return state
  }
}