const router = require('express').Router()
const { Comment, User } = require('../db/models')


router.get('/', (req, res, next) => {
  Comment.findAll({
    where: {
      contentId: req.query.contentId
    },
    include: [{ model: User }]
  })
    .then(comments => {
      res.json(comments)
    })
    .catch(next)
})


router.post('/', (req, res, next) => {
  Comment.create({
    body: req.body.body,
    userId: req.body.userId,
    contentId: req.body.contentId
  })
    .then(comment => {
      return Comment.findAll({
        where: { id: comment.id },
        include: [{ all: true }]
      })
    })
    .then(foundComment => res.json(foundComment[0]))
    .catch(next)
})


module.exports = router