import axios from 'axios'

// //ACTION TYPEs

const GET_CONTENT = 'GET_CONTENT'

// //ACTION CREATORS

const getContent = (content) => {
    return { type: GET_CONTENT, content }
}

// //THUNKS
export function fetchContent (eventId) {
  return function thunk(dispatch) {
      console.log("eventId in Thunk is:", eventId)
    return axios.get(`/api/content/${eventId}`)
    .then(res => res.data)
    .then(content => {
      const action = getContent(content)
      return dispatch(action)
    })
  }
}

// //REDUCER

export default (state = [], action) => {
    switch (action.type) {
        case GET_CONTENT:
            return action.content
        default:
            return state
    }
}

