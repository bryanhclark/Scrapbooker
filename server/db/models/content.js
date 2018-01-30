const Sequelize = require('sequelize')
const db = require('../db')

const Content = db.define('content', {
	type: {
			type: Sequelize.STRING,
			allowNull: false,
			isIn: [['image', 'text']],
	},
	value: {
			type: Sequelize.STRING,
			allowNull: false
	}

	// timeCreated: {
	// 		type: Sequelize.DATE,
	// 		allowNull: true
	// }
})

module.exports = Content;
