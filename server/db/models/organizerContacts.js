const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')
const { User } = require('./index')

const organizerContacts = db.define('organizer_contacts', {})



module.exports = organizerContacts
