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
const IP = `172.16.21.47`;

router.post('/', (req, res, next) => {
  let participants = req.body.participants
  let organize = req.body.organizer
  let event = req.body.event
  console.log('in backend here\'s the event, ', event)
  participants.map(participant => {
    return bitly.shorten(`http://${IP}:8080/events/${event.secret}/upload/${participant.user.userHash}`)
      .then(URL => {
        return messageSender.messages.create({
          body: `You have been invited to ${event.name} \n Location: ${event.street}, ${event.city}, ${event.state} \n This event starts at ${event.startTime} \n Join the event: ${URL.data.url}`,
          to: `+1${participant.user.phone}`,
          from: TWILLIONUMBER
        })
          .then((messageSent) => {
            res.json(messageSent.body)
          })
      })
  })
})

