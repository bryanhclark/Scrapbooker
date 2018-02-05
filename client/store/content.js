import axios from 'axios'
import store from './index'

// //ACTION TYPEs

const GET_CONTENT = 'GET_CONTENT'
const NEW_CONTENT = 'NEW_CONTENT'

// //ACTION CREATORS

const getContent = (content) => {
	return { type: GET_CONTENT, content }
}

const getNewContent = (newContent) => {
	let action = { type: NEW_CONTENT, newContent }
	store.dispatch(action)
}

// //THUNKS
export function fetchContent(eventSecret) {
	return dispatch => {
		return axios.get(`/api/content/${eventSecret}`)
			.then(res => dispatch(getContent(res.data)))
			.catch(console.error)
	}
}

export const postContent = (contentObj) => {
	return dispatch => {
		axios.post('/api/content/image', { contentObj })
			.then(response => {
				console.log("Saved successfully to the DB")
			})
			.catch(console.error)
	}
}

export const socketStoreUpdate = (imageObj) => {
	getNewContent(imageObj)
}

// //REDUCER

export default (state = [], action) => {
	switch (action.type) {
		case GET_CONTENT:
			return action.content
		case NEW_CONTENT:
			return [...state, action.newContent]
		default:
			return state
	}
}

