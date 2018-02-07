const router = require('express').Router()
const { usersEvents, User, Event } = require('../db/models')
//figure out how to 
router.get('/', (req, res, next) => {
  usersEvents.findAll({
    include: [{ model: Event, where: { secret: req.query.secret } }, User]
  })
    .then(participants => res.json(participants))
    .catch(next)
})

router.get('/:userHash', (req, res, next) => {
  User.findOne({
    where: { userHash: req.params.userHash }
  })
    .then(user => res.json(user))
    .catch(next)
})


router.post('/', (req, res, next) => {
  usersEvents.create({
    eventId: req.body.eventId,
    userId: req.body.participantId
  })
    .then(participant => {
      return usersEvents.findOne({
        where: participant.userId,
        include: [{ model: User }]
      })
    })
    .then(foundParticipant => res.json(foundParticipant))
    .catch(next)
})


module.exports = router
