const Sequelize = require('sequelize')
const db = require('../db')



const Contact = db.define('contacts', {
	name: {
		type: Sequelize.STRING,
	},
	phone: {
		type: Sequelize.STRING
	}
})

// instance methods
Contact.prototype.correctSecret = (possibleSecret) => {
  return Contact.encryptSecret(possibleSecret, this.salt) === this.secret
}

//Class Methods

Contact.generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
}

Contact.encryptSecret = (name, salt) => {
  return crypto
      .createHash('RSA-SHA256')
      .update(name)
      .update(salt)
      .digest('hex')
}

//hooks

const setSaltandSecret = contact => {
  Contact.salt = Contact.generateSalt()
  Contact.secret = Contact.encryptSecret(contact.name, contact.salt)
}


Contact.beforeCreate(setSaltandSecret)

module.exports = Contact
