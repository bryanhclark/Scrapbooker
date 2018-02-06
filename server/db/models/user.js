const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  userHash: {
    type: Sequelize.STRING
  }

}, {
    getterMethods: {
      fullName() {
        return this.firstName + ' ' + this.lastName
      }
    }
  })

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}



/**
 * classMethods
 */
User.generateSalt = () => {
  return Math.random().toString(28).substring(2, 23)
}

User.generateHash = () => {
  console.log('in generate hash')
  return "_" + Math.random().toString(17).substring(2, 15)
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltHashAndPassword = user => {
  user.userHash = User.generateHash()
  if (user.changed('password')) {
    user.salt = User.generateSalt()

    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltHashAndPassword)
User.beforeUpdate(setSaltHashAndPassword)

