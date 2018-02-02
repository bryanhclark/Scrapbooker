const router = require('express').Router()
const Events = require('../db/models/event')

//Create an event
//Passes in an object that is identical to the db model
//Make sure the front end obj === db model obj

router.get('/', (req, res, next) => {
  //stringify req.query
  Events.findAll({
    where: req.query
  })
    .then(events => res.json(events))
})

router.get('/:eventId', (req, res, next) => {
  Events.findById(req.params.eventId)
    .then(event => res.json(event))
    .catch(next)
})


router.post('/', (req, res, next) => {
  Events.create({
    name: req.body.name,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    endTime: req.body.endTime,
    startTime: req.body.startTime,
    organizerId: req.body.organizerId
  })
    .then(newEvent => res.json(newEvent))
    .catch(next);
})

module.exports = router
