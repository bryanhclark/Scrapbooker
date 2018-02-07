import axios from 'axios'

//ACTION TYPE
const GET_CURRENT_COMMENTS = 'GET_CURRENT_COMMENTS'
const ADD_NEW_COMMENT = 'ADD_COMMENT'

//ACTION CREATORS
const getCurrentComments = (comments) => {
  return { type: GET_CURRENT_COMMENTS, comments }
}

const addNewComment = (newComment) => {
  return { type: ADD_NEW_COMMENT, newComment }
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

//REDUCER
export default (state = [], action) => {
  switch (action.type) {
    case GET_CURRENT_COMMENTS:
      return action.comments
    case ADD_NEW_COMMENT:
      return [...state, action.newComment]
    default:
      return state;
  }
}