const router = require('express').Router()
const { User, Event } = require('../db/models')
module.exports = router


router.get('/:organizerId/events', (req, res, next) => {
  Event.findAll({
    where: {
      organizerId: req.params.organizerId
    }
  })
    .then(events => res.json(events))
})


router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})



