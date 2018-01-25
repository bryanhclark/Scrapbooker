const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')


const Event = db.define('event', {
    secret: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    endTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    salt: {
        type: Sequelize.String
    }
})


module.exports = Event;

//instance methods
Event.prototype.correctSecret = (possibleSecret) => {
    return Event.encryptSecret(possibleSecret, this.salt) === this.secret
}

//Class Methods

Event.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64')
}

Event.encryptSecret = (name, salt) => {
    return crypto
        .createHash('RSA-SHA256')
        .update(name)
        .update(salt)
        .digest('hex')
}

//hooks 

const setSaltandSecret = event => {
    event.salt = Event.generateSalt()
    event.secret = Event.encryptSecret(event.name, event.salt)
}


Event.beforeCreate(setSaltandSecret)