const router = require('express').Router()
const { TwilioConfig, TWILLIONUMBER, BITLYCONFIG } = require('../../secrets')
const { usersEvents } = require('../db/models')
const Twilio = require('twilio');
const BitlyClient = require('bitly')
const bitly = BitlyClient(BITLYCONFIG)
module.exports = router;

//Connects to Twilio config
const messageSender = new Twilio(TwilioConfig.accountSid, TwilioConfig.authToken);

//For local testing paste IP here
const projURL = 'http://www.scrapprapp.com'

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
          from: TWILLIONUMBER
        })
          .then((messageSent) => {
            res.json(messageSent.body)
          })
      })
  })
})

