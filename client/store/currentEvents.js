import axios from 'axios'


// //ACTION TYPES
const GET_CURRENT_EVENTS = 'GET_CURRENT_EVENTS'
const ADD_CURRENT_EVENTS = 'GET_CURADD_CURRENT_EVENTSRENT_EVENTS'

// //ACTION CREATORS

const getCurrentEvents = (currentEvents) => {
	return {
		type: GET_CURRENT_EVENTS, currentEvents
	}
}

const addCurrentEvents = (newEvent) => {
	return {
		type: ADD_CURRENT_EVENTS, newEvent
	}
}


export const fetchCurrentEvents = organizerId => {
	return dispatch => {
		axios.get(`/api/events`, { params: { organizerId } })
			.then(res => dispatch(getCurrentEvents(res.data)))
	}
}

export const createEvent = (eventObj) => {
	return dispatch => {
		axios.post('/api/events', eventObj)
			.then(res => dispatch(addCurrentEvents(res.data)))
			.catch(console.error)
	}
}


export default (state = [], action) => {
	switch (action.type) {
		case GET_CURRENT_EVENTS:
			return action.currentEvents
		case ADD_CURRENT_EVENTS:
			return [...state, action.newEvent]
		default:
			return state
	}
}