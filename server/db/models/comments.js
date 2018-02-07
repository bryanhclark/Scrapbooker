const Sequelize = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})
//commenter id & commenter type (table
//make participants be able to contact


module.exports = Comment