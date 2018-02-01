const router = require('express').Router()
const {TwilioConfig, TWILLIONUMBER} = require('../../secrets')
const {Event} = require('../db/models')
const Twilio = require('twilio');
module.exports = router;

//Connects to Twilio config
const messageSender = new Twilio(TwilioConfig.accountSid, TwilioConfig.authToken);

//For local testing paste IP here
const IP = '000.00.00.00'

router.post('/', (req, res, next) => {

  let eventId = req.body.eventId

  Event.findById({eventId, include: [{all: true}]})
  .then(event => event.getParticipants())
  .then(participants => {
    //Check the syntax of the incoming phone number
    // Must be: "+1__________"
    participants.map(participant => {
      return messageSender.messages.create({
        //Option to add a message to Twilio message use this => ${req.body.message}
        body: `Event Link: ${IP}:8080/events/${eventId}`,
        //AFTER TEST CHANGE THIS TO participant.phone
        to: "+15164580715",
        from: TWILLIONUMBER
      })
      .then((messageSent) => {
        console.log('Message send successful ' + messageSent.sid)
        res.json(messageSent.body)
      })
    })
  })
})
