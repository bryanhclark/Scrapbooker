const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')


//AFTER TESTING CHANGE START & END TIME BACK TO DATES
// temporarily using strings to test
//also uncomment salt and secrets

const Event = db.define('events', {
	secret: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	},
	name: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: true
	},
	street: {
		type: Sequelize.STRING,
		allowNull: true
	},
	city: {
		type: Sequelize.STRING,
		allowNull: true
	},
	state: {
		type: Sequelize.STRING,
		allowNull: true
	},
	zip: {
		type: Sequelize.STRING,
		allowNull: true
	},
	startTime: {
		type: Sequelize.STRING,
		allowNull: true
	},
	endTime: {
		type: Sequelize.STRING,
		allowNull: true
	}
})


module.exports = Event;


//Class Methods
Event.generateSecret= () => {
  return Math.random().toString(20).substring(2, 17)
}


//hooks
const setSecret = (event) => {
	event.secret = Event.generateSecret()
}

Event.beforeCreate(setSecret)
