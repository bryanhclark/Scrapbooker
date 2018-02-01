const Sequelize = require('sequelize')
const db = require('../db')


ContactsEvents = db.define('contacts_events');


module.exports = ContactsEvents
