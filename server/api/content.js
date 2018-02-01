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
    req.body = req.body.contentObj
    Content.create({
        type: 'image',
        src: req.body.src,
        width: req.body.width,
        height: req.body.height,
        orientation: req.body.orientation,
        timeCreated: req.body.timeCreated,
        eventId: req.body.eventId
    })
        .then(content => res.json(content))
        .catch(next);
})

module.exports = router
