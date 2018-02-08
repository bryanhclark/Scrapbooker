import axios from 'axios'
import store from './index'

//ACTION TYPE
const GET_CURRENT_COMMENTS = 'GET_CURRENT_COMMENTS'
const NEW_COMMENT = 'NEW_COMMENT'

//ACTION CREATORS
const getCurrentComments = (comments) => {
  return { type: GET_CURRENT_COMMENTS, comments }
}

const addNewComment = (newComment) => {
  return { type: NEW_COMMENT, newComment }
}

const getNewSocketContent = (newComment) => {
	let action = { type: NEW_COMMENT, newComment }
	store.dispatch(action)
}


//THUNKS
export const fetchCurrentComments = (contentId) => {
  return dispatch => {
    axios.get('/api/comments', { params: { contentId } })
      .then(res => dispatch(getCurrentComments(res.data)))
      .catch(console.error)
  }
}

export const addNewCommentThunk = (commentObj) => {
  return dispatch => {
    axios.post('/api/comments', (commentObj))
      .then(res => dispatch(addNewComment(res.data)))
      .catch(console.error)
  }
}

export const socketStoreCommentUpdate = (commentObj) => {
	getNewSocketContent(commentObj)
}

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case GET_CURRENT_COMMENTS:
      return action.comments
    case NEW_COMMENT:
      return [...state, action.newComment]
    default:
      return state;
  }
}
