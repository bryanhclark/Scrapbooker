const Sequelize = require('sequelize')
const db = require('../db')

const Content = db.define('content', {
	type: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "image"
	},
	src: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	timeCreated: {
		type: Sequelize.DATE,
		allowNull: false
	},
	width: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	height: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	orientation: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = Content;
