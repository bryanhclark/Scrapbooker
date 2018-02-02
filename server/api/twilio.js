const router = require('express').Router()
const {TwilioConfig, TWILLIONUMBER} = require('../../secrets')
const {Event, Participants} = require('../db/models')
const Twilio = require('twilio');
module.exports = router;

//Connects to Twilio config
const messageSender = new Twilio(TwilioConfig.accountSid, TwilioConfig.authToken);

//For local testing paste IP here
const IP = ``;

router.post('/', (req, res, next) => {
  Participants.findAll({
    where: {eventId: req.body.eventId},
    include: [{all: true}]
  })
  .then(participants => {
    // console.log('participants', participants)
    // Check the syntax of the incoming phone number
    // Must be: "+1__________"
    participants.map(participant => {

      return messageSender.messages.create({
        body: `http://${IP}:8080/events/${req.body.eventId}`,
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
