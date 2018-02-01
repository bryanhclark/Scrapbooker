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
	console.log("got to getNewContent")
	let action = { type: NEW_CONTENT, newContent }
	store.dispatch(action)
}

// //THUNKS
export function fetchContent(eventId) {
	return function thunk(dispatch) {
		return axios.get(`/api/content/${eventId}`)
			.then(res => res.data)
			.then(content => {
				const action = getContent(content)
				return dispatch(action)
			})
	}
}

export const postContent = (contentObj) => {
	console.log("contentObj before Axios", contentObj)
	return function thunk(dispatch) {
		axios.post('/api/content/image', { contentObj })
			.then(response => {
				// dispatch(getImages(response.data.images))
			})
	}
}

export const socketStoreUpdate = (imageObj) => {
	console.log('in socket store update', imageObj)
	getNewContent(imageObj)
}

// //REDUCER

export default (state = [], action) => {
	switch (action.type) {
		case GET_CONTENT:
			return action.content
		case NEW_CONTENT:
			console.log("got to store", action.newContent)
			return [...state, action.newContent]
		default:
			return state
	}
}

