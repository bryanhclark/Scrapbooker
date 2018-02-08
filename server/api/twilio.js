const router = require('express').Router()
const { usersEvents } = require('../db/models')
const Twilio = require('twilio');
const BitlyClient = require('bitly')
const bitly = BitlyClient(process.env.BITLYCONFIG)
module.exports = router;

//Connects to Twilio config
const messageSender = new Twilio(process.env.TwilioConfigaccountSid, process.env.TwilioConfigauthToken);

//For local testing paste IP here
const IP = `172.16.21.47`;
const projURL = 'https://scrappr-app.herokuapp.com'

router.post('/', (req, res, next) => {
  let participants = req.body.participants
  let organizer = req.body.organizer
  let event = req.body.event
  participants.map(participant => {
    return bitly.shorten(`${projURL}/events/${event.secret}/upload/${participant.user.userHash}`)
      .then(URL => {
        return messageSender.messages.create({
          body: `${organizer.fullName} has invited you to contribute to the <${event.name}> scrapbook. Add content here: ${URL.data.url}`,
          to: `+1${participant.user.phone}`,
          from: process.env.TWILLIONUMBER
        })
          .then((messageSent) => {
            res.json(messageSent.body)
          })
      })
  })
})

