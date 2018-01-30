const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')


const Event = db.define('event', {
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
        type: Sequelize.DATE,
        allowNull: true
    },
    endTime: {
        type: Sequelize.DATE,
        allowNull: true
    },
    salt: {
        type: Sequelize.STRING
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