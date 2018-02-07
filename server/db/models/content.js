const Sequelize = require('sequelize')
const db = require('../db')

const Content = db.define('content', {
	type: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: "image"
	},
	src: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	timeCreated: {
		type: Sequelize.STRING,
		allowNull: true
	},
	width: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	height: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	orientation: {
		type: Sequelize.INTEGER,
		allowNull: true
  }
})

module.exports = Content;
