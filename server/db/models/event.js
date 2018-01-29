const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')


//AFTER TESTING CHANGE START & END TIME BACK TO DATES

const Events = db.define('events', {
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
        type: Sequelize.STRING,
        allowNull: false
    },
    endTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING
    }
})


module.exports = Events;

//instance methods
// Events.prototype.correctSecret = (possibleSecret) => {
//     return Events.encryptSecret(possibleSecret, this.salt) === this.secret
// }

// //Class Methods

// Events.generateSalt = () => {
//     return crypto.randomBytes(16).toString('base64')
// }

// Events.encryptSecret = (name, salt) => {
//     return crypto
//         .createHash('RSA-SHA256')
//         .update(name)
//         .update(salt)
//         .digest('hex')
// }

// //hooks

// const setSaltandSecret = event => {
//     event.salt = Events.generateSalt()
//     event.secret = Events.encryptSecret(event.name, event.salt)
// }


// Events.beforeCreate(setSaltandSecret)
