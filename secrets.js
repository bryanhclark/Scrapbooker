const firebase = require('firebase')


const config = {
    apiKey: "AIzaSyCgYLyDM38JZEvWOn19tmmrcXM9FtbUwY0",
    authDomain: "take3-44012.firebaseapp.com",
    databaseURL: "https://take3-44012.firebaseio.com",
    projectId: "take3-44012",
    storageBucket: "take3-44012.appspot.com",
    messagingSenderId: "807072044786"
};


const firebaseInitialize = firebase.initializeApp(config)


module.exports = { config, firebaseInitialize };