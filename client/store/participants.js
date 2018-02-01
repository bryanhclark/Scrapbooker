import axios from 'axios'

//ACTION TYPE
const GET_PARTICIPANTS = 'GET_PARTICIPANTS'
const ADD_PARTICIPANTS = 'ADD_PARTICIPANTS'


//ACTION CREATOR
const getPartipants = (participants) => {
  return { type: GET_PARTICIPANTS, participants }
}

const addParticipants = (participants) => {
  return { type: ADD_PARTICIPANTS, participants }
}



//THUNK
const addParticipantsToEvent = (participantsArray) => {
  return (dispatch) => {
    //promise.all 
    //map over array
    //
    Promise.all(participantsArray.map(participant => {
      axios.post('/api/participants', {})
    })
    
  }
}


//REDUCER