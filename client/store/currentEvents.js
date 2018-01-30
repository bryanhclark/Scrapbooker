import axios from 'axios'


// //ACTION TYPES
const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'

// //ACTION CREATORS

const getCurrentEvents = (event) => {
    let action = {
        type: ADD_EVENT,
        event
    }
    return action
}




export default (state = [], action) => {
    switch (action.type) {
        case ADD_EVENT:
            return [...state, action.currentEvents]
        default:
            return state
    }
}