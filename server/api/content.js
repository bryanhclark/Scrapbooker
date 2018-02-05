const router = require('express').Router()
const { Content, Event } = require('../db/models')


router.get('/', (req, res, next) => {
	Content.findAll()
		.then(content => {
			res.json(content)
		})
		.catch(next)
})

router.get('/:eventSecret', (req, res, next) => {
	Content.findAll({
		include: [{ model: Event, where: { secret: req.params.eventSecret } }]
	})
		.then(content => {
			console.log(content)
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
		eventId: req.body.eventId,
		contactId: req.body.contactId
	})
    .then(content => {
      console.log(content)
      res.json(content)})

		.catch(next);
})

module.exports = router
