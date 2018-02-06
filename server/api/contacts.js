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
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    organizerId: req.body.organizerId
  })
    .then(contact => res.json(contact))
    .catch(next)
})

module.exports = router
