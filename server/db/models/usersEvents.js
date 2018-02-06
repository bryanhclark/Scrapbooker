const Sequelize = require('sequelize')
const db = require('../db')


usersEvents = db.define('users_events');


module.exports = usersEvents
