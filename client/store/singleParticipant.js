import axios from 'axios'

//ACTION TYPE
const GET_CURRENT_PARTICIPANT = 'GET_CURRENT_PARTICIPANT'

//ACTION CREATORS
const getCurrentParticipant = (participant) => {
  return { type: GET_CURRENT_PARTICIPANT, participant }
}

//THUNKS

export const fetchCurrentParticipant = (userHash) => {
  return dispatch => {
    axios.get(`/api/participants/${userHash}`)
      .then(res => dispatch(getCurrentParticipant(res.data)))
      .catch(console.error)
  }
}


export default (state = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_PARTICIPANT:
      return action.participant
    default:
      return state
  }
}