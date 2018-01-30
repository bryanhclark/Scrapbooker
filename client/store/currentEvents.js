import axios from 'axios'


// //ACTION TYPES
const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'

// //ACTION CREATORS

const getCurrentEvents = (event) => {
    let action = {
        type: GET_CURRENT_EVENTS,
        event
    }
    return action
}




export default (state = [], action) => {
    switch (action.type) {
        case GET_CURRENT_EVENTS:
            return [...state, action.currentEvents]
        default:
            return state
    }
}