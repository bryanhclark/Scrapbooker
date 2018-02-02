const router = require('express').Router()
const {TwilioConfig, TWILLIONUMBER, BITLYCONFIG} = require('../../secrets')
const {Participants} = require('../db/models')
const Twilio = require('twilio');
const BitlyClient = require('bitly')
const bitly = BitlyClient(BITLYCONFIG)
module.exports = router;

//Connects to Twilio config
const messageSender = new Twilio(TwilioConfig.accountSid, TwilioConfig.authToken);

//For local testing paste IP here
const IP = `172.16.21.83`;

router.post('/', (req, res, next) => {
  Participants.findAll({
    where: {eventId: req.body.eventId},
    include: [{all: true}]
  })
  .then(participants => {
    participants.map(participant => {
      return bitly.shorten(`http://${IP}:8080/events/${req.body.eventId}`)
      .then(URL => {
        console.log(URL)
        return messageSender.messages.create({
          body: URL.data.url,
          to: `+1${participant.contact.phone}`,
          from: TWILLIONUMBER
        })
        .then((messageSent) => {
          console.log('Message send successful ' + messageSent.sid)
          res.json(messageSent.body)
        })
      })
    })
  })
})
