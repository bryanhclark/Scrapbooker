const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')



const Contact = db.define('contacts', {
	name: {
		type: Sequelize.STRING,
	},
	phone: {
		type: Sequelize.STRING
	},
	contactHash: {
		type: Sequelize.STRING
	}
})

//Class Methods

Contact.generateHash = () => {
	return "_" + Math.random().toString(17).substring(2, 15)
}



// hooks

const setHash = contact => {
	contact.contactHash = Contact.generateHash()
}


Contact.beforeCreate(setHash)

module.exports = Contact
