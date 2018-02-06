const nodemailer = require('nodemailer');
const router = require('express').Router()
const {usersEvents} = require('../db/models')
const {appPassword, appUsername} = require('../../secrets')
module.exports = router

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: appUsername,
         pass: appPassword
     }
 })

 ;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing

router.post('/', (req, res, next) => {
  usersEvents.findAll({
    where: { eventId: req.body.id },
    include: [{ all: true }]
  })
  .then(participants => {
    participants.map(participant => {
      let mailOptions = {
        from: `${appUsername}`, // sender address
        to: `${participant.user.email}`, // list of receivers
        subject: 'Scrappr Event Invite', // Subject line
        text: `You have been invited to an event at ${participant.event.street}, ${participant.event.city}, ${participant.event.state}. \n The event begins at ${participant.event.startTime}. \n Come join us!`
      }
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {return console.log(error)}
          console.log('Message sent: %s', info.messageId);
      })
    })
  })
})
