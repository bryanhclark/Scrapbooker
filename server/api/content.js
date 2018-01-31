const router = require('express').Router()
const { Content } = require('../db/models')


router.get('/', (req, res, next) => {
    Content.findAll()
        .then(content => {
            res.json(content)
        })
        .catch(next)
})

router.get('/:eventId', (req, res, next) => {
    Content.findAll({
        where: {
          eventId: Number(req.params.eventId)
        }
      })
        .then(content => {
            res.json(content)
        })
        .catch(next)
})

router.post('/image', (req, res, next) => {

    Content.create({
        type: 'image',
        src: req.body.imageURL,
        eventId: 2
    })
        .then(content => res.json(content))
        .catch(next);
})

module.exports = router
