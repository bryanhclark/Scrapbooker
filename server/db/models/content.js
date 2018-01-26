const Sequelize = require('sequelize')
const db = require('../db')



const Content = db.define('content', {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('image', 'text'),
        allowNull: false
    },
    timeStamp: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

module.exports = Content;