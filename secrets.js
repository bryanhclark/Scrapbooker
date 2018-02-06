//Firebase Config
const firebase = require('firebase')

const config = {
    apiKey: "AIzaSyCgYLyDM38JZEvWOn19tmmrcXM9FtbUwY0",
    authDomain: "take3-44012.firebaseapp.com",
    databaseURL: "https://take3-44012.firebaseio.com",
    projectId: "take3-44012",
    storageBucket: "take3-44012.appspot.com",
    messagingSenderId: "807072044786"
};

process.env.GOOGLE_CLIENT_ID = '592209444628-h9bmno2aqadih7s17dmjn945t3net2ir.apps.googleusercontent.com'
process.env.GOOGLE_CLIENT_SECRET = '3mXC9jQmIAqy5PeyN5XPCXw5'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'


const firebaseInitialize = firebase.initializeApp(config)


//Twillio Config

let TwilioConfig = {
  accountSid: 'ACd7416b567633dffcd6ed3e68cd094f6c',
  authToken: '40a13fe3f179fa9cf78e27895bb9bb73'
}

let TWILLIONUMBER = '+12016131005'

//Bitly Config
let BITLYCONFIG = '7735debd667cbbf1d31c9f9691251369e5592531'

//Email
let appUsername = 'scrapprapp@gmail.com'
let appPassword = 'scrappr@FSANY'

module.exports = { config, firebaseInitialize, TwilioConfig, TWILLIONUMBER, BITLYCONFIG, appPassword, appUsername };
