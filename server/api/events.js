const router = require('express').Router()
const Events = require('../db/models/event')

//Create an event
//Passes in an object that is identical to the db model
//Make sure the front end obj === db model obj
router.post('/createEvent', (req, res, next) => {
  Events.create({
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    endTime: req.body.endTime,
    startTime: req.body.startTime
  })
  .then(newEvent => {res.json(newEvent)})
  .catch(next);
})

module.exports = router


