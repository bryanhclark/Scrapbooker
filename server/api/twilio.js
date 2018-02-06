const router = require('express').Router()
const { TwilioConfig, TWILLIONUMBER, BITLYCONFIG } = require('../../secrets')
const { Participants } = require('../db/models')
const Twilio = require('twilio');
const BitlyClient = require('bitly')
const bitly = BitlyClient(BITLYCONFIG)
module.exports = router;

//Connects to Twilio config
const messageSender = new Twilio(TwilioConfig.accountSid, TwilioConfig.authToken);

//For local testing paste IP here
const IP = `172.16.21.47`;

router.post('/', (req, res, next) => {
  console.log('in twilio post route', req.body)
  Participants.findAll({

    where: { eventId: req.body.id },
    include: [{ all: true }]
  })
    .then(participants => {
      participants.map(participant => {
        return bitly.shorten(`http://${IP}:8080/events/${req.body.secret}/upload/${participant.contact.contactHash}`)
          .then(URL => {
            return messageSender.messages.create({
              body: `You have been invited to ${req.body.name} \n Location: ${req.body.street}, ${req.body.city}, ${req.body.state} \n This event starts at ${req.body.startTime} \n Join the event: ${URL.data.url}`,
              to: `+1${participant.contact.phone}`,
              from: TWILLIONUMBER
            })
              .then((messageSent) => {
                res.json(messageSent.body)
              })
          })
      })
    })
})

