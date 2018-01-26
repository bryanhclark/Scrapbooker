import axios from 'axios'
import history from '../history'
import * as firebase from 'firebase'


//ACTION TYPEs

const UPLOAD_TO_FIREBASE = 'UPLOAD_TO_FIREBASE'


//ACTION CREATORS

const getPictures = (pictures) => { type: UPLOAD_TO_FIREBASE, pictures }


//THUNKS

export const uploadImageToFireBaseThunk = (image) => {
    const storage = firebase.storage();
    const storageRef = firebase.storage().ref(image.name);
    const name = image.name
    storageRef.put(image).then((snapshot) => {
        console.log('uploaded');
    })
    // return dispatch => {

    // imageToUpload.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    //     let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log('Upload is ' + progress + '%done')
    //     switch (snapshot.state) {
    //         case firebase.storage.TaskState.PAUSED:
    //             console.log('Upload is paused');
    //             break;
    //         case firebase.storage.TaskState.RUNNING:
    //             console.log('Upload is running');
    //             break
    //     }

    // }, (err) => {
    //     console.log(error.code)
    // }, () => {
    //     let downloadURL = imageToUpload.snapshot.downloadURL
    //     console.log(downloadURL)
    //     dispatch(getPictures(downloadURL))
    // })
    // }
}


//REDUCER

export default (state = [], action) => {
    switch (action.type) {
        case UPLOAD_TO_FIREBASE:
            return action.pictures
        default:
            return state
    }
}

