const router = require('express').Router()
const { Contact } = require('../db/models')


router.get('/', (req, res, next) => {
  Contact.findAll({
    where: {
      organizerId: req.query.organizerId
    }
  })
    .then(contacts => {
      res.json(contacts)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Contact.create({
    name: req.body.name,
    phone: req.body.phone,
    organizerId: req.body.organizerId
  })
    .then(contact => {
      res.json(contact)
    })
    .catch(next)
})

module.exports = router