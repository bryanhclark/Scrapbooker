const router = require('express').Router()
const { Participants, Contact } = require('../db/models')

router.get('/', (req, res, next) => {
  Participants.findAll({
    where: req.query,
    include: [Contact]
  })
    .then(participants => res.json(participants))
    .catch(next)
})


router.post('/', (req, res, next) => {
  Participants.create({
    eventId: req.body.eventId,
    contactId: req.body.contactId
  })
    .then(participant => {
      return Participants.findOne({
        where: participant.contactId,
        include: [Contact]
      })
    })
    .then(contact => res.json(contact))
    .catch(next)
})



module.exports = router