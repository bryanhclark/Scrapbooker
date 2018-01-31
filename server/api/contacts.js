const router = require('express').Router()
const { Contact } = require('../db/models')


router.get('/', (req, res, next) => {
    Contact.findAll()
        .then(contacts => {
            res.json(contacts)
        })
        .catch(next)
})

router.get('/:organizerId', (req, res, next) => {
    Contact.findAll({
        where: {
            organizerId: req.params.organizerId
        }
    })
        .then(contacts => {
            res.json(contacts)
        })
        .catch(next)
})





module.exports = router