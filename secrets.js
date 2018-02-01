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
  accountSid: 'ACa6c533cd30c263d75a4ede58e45e69ed',
  authToken: 'b961a4b4a936485e703bcfbf799959ba'
}

let TWILLIONUMBER = '+13478756349'

module.exports = { config, firebaseInitialize, TwilioConfig, TWILLIONUMBER };
