const router = require('express').Router()
const { Contact, User, organizerContacts } = require('../db/models')


router.get('/', (req, res, next) => {
  User.findAll({
    where: req.query
  })
    .then(contacts => {
      res.json(contacts)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  User.create({
    firstName: req.body.name,
    phone: req.body.phone,
    organizerId: req.body.organizerId
  })
    .then(contact => res.json(contact))
    .catch(next)
})

module.exports = router