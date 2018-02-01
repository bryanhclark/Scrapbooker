import axios from 'axios'

// //ACTION TYPEs

const GET_CONTENT = 'GET_CONTENT'
const NEW_CONTENT = 'NEW_CONTENT'

// //ACTION CREATORS

const getContent = (content) => {
	return { type: GET_CONTENT, content }
}

const getNewContent = (newContent) => {
  console.log("got to getNewContent")
  return {type: NEW_CONTENT, newContent }
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
				console.log('response data is', response.data)
				// dispatch(getImages(response.data.images))
			})
	}
}

export const socketStoreUpdate = (imageObj) => {
    console.log("outside thunk")
    return function thunk(dispatch) {
      console.log("inside thunk")
      return dispatch(getNewContent(imageObj))
    }
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

