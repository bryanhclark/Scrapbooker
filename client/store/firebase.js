import axios from 'axios'
import history from '../history'
import * as firebase from 'firebase'


// //ACTION TYPEs

const UPLOAD_TO_FIREBASE = 'UPLOAD_TO_FIREBASE'
var config = {
  apiKey: "AIzaSyCgYLyDM38JZEvWOn19tmmrcXM9FtbUwY0",
  authDomain: "take3-44012.firebaseapp.com",
  databaseURL: "https://take3-44012.firebaseio.com",
  projectId: "take3-44012",
  storageBucket: "take3-44012.appspot.com",
  messagingSenderId: "807072044786"
};
firebase.initializeApp(config)


// //ACTION CREATORS

const getPictures = (pictures) => { type: UPLOAD_TO_FIREBASE, pictures }


// //THUNKS

export const uploadImageToFireBaseThunk = (image, eventId) => {
    eventId = eventId || 1
    const name = image.name
    const imageRef = firebase.storage().ref(`images/${eventId}`).child(name).put(image)

    imageRef.on('state_changed', function(snapshot) {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '%done')
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING:
                console.log('Upload is running');
                break
        }
    }, function(err) {
      console.log(err.code)
    }, function() {
      console.log(imageRef.snapshot)
    })
    return dispatch => {
      console.log("SUCCESS")
    // imageRef.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
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

    // }, () => {
    //     let downloadURL = imageToUpload.snapshot.downloadURL
    //     console.log(downloadURL)
    //     dispatch(getPictures(downloadURL))
    // })
    }
}


// //REDUCER

export default (state = [], action) => {
    switch (action.type) {
        case UPLOAD_TO_FIREBASE:
            return action.pictures
        default:
            return state
    }
}

