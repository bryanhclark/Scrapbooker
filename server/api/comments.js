const router = require('express').Router()
const { Comment } = require('../db/models')


router.get('/', (req, res, next) => {
  Comment.findAll({
    where: {
      contentId: req.query.contentId
    }
  })
    .then(comments => {
      res.json(comments)
    })
    .catch(next)
})


router.post('/', (req, res, next) => {
  Comment.create({
    body: req.body.body,
    contactId: req.body.contactId,
    contentId: req.body.contentId
  })
    .then(comment => {
      res.json(comment)
    })
    .catch(next)
})


module.exports = router