const router = require('express').Router()
const { Content } = require('../db/models')


router.get('/', (req, res, next) => {
    Content.findAll()
        .then(content => {
            res.json(content)
        })
        .catch(next)
})


router.post('/image', (req, res, next) => {
    Content.create({
        type: 'image',
        downloadURL: req.body.imageURL,
        eventId: 1
    })
        .then(content => res.json(content))
        .catch(next);
})

module.exports = router
