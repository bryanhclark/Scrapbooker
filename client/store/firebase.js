import axios from 'axios'
import history from '../history'
import * as firebase from 'firebase'
import { config } from '../../secrets'
import "babel-polyfill"


// //ACTION TYPEs

const UPLOAD_TO_FIREBASE = 'UPLOAD_TO_FIREBASE'

// //ACTION CREATORS

const getPictures = (pictures) => {
    return { type: UPLOAD_TO_FIREBASE, pictures }
}


// //THUNKS
//async await 
export const uploadImageToFireBaseThunk = (image) => {
    return (dispatch) => {
        axios.post('/api/content', { imageURL: image })
            .then((response) => {
                console.log(response.data.downloadURL)
                dispatch(getPictures(response.data.downloadURL))
            })
    }
}




// //REDUCER

export default (state = [], action) => {
    switch (action.type) {
        case UPLOAD_TO_FIREBASE:
            return [...state, action.pictures]
        default:
            return state
    }
}

