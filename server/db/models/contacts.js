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


module.exports = Contact