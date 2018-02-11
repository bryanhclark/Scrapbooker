import axios from 'axios'
import store from './index'

// //ACTION TYPEs

const GET_CONTENT = 'GET_CONTENT'
const NEW_CONTENT = 'NEW_CONTENT'

// //ACTION CREATORS

const getContent = (content) => {
	return { type: GET_CONTENT, content }
}

const getNewSocketContent = (newContent) => {
	let action = { type: NEW_CONTENT, newContent }
	store.dispatch(action)
}

const getNewContent = (newContent) => {
	return { type: NEW_CONTENT, newContent }
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
	console.log(contentObj);
	return dispatch => {
		axios.post('/api/content/image', { contentObj })
			.then(response => {
				dispatch(getNewContent(response.data))
			})
			.catch(console.error)
	}
}

export const socketStoreImageUpdate = (imageObj) => {
	getNewSocketContent(imageObj)
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

