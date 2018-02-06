const nodemailer = require('nodemailer');
const router = require('express').Router()
const {appPassword, appUsername} = require('../../secrets')
module.exports = router

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: appUsername,
         pass: appPassword
     }
 })

 let mailOptions = {
  from: `${appUsername}`, // sender address
  to: 'jwadedelay@gmail.com, jdelay.jr@gmail.com', // list of receivers
  subject: 'Test', // Subject line
  text: 'Hello world?', // plain text body
  html: '<b>Hello world?</b>' // html body
};

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
router.post('/', (req, res, next) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {return console.log(error)}
        console.log('Message sent: %s', info.messageId);

    })
  res.json("Success!")
})
