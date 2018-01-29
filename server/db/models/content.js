const Sequelize = require('sequelize')
const db = require('../db')



const Content = db.define('content', {
    downloadURL: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('image', 'text'),
        allowNull: true
    },
    timeCreated: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

module.exports = Content;