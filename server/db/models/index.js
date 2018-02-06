const User = require('./user')
const Event = require('./event')
const Content = require('./content')
const organizerContacts = require('./organizerContacts')
const usersEvents = require('./usersEvents')
const Comment = require('./comments')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Comment.belongsTo(User);
Comment.belongsTo(Content);
User.hasMany(Comment)
Content.belongsTo(User)
Content.belongsTo(Event)
User.hasMany(Content)
User.hasMany(User, { as: 'Contact', foreignKey: 'organizerId', useJunctionTable: false })
Event.belongsTo(User, { as: 'organizer' })
User.belongsToMany(Event, { as: 'participant', through: usersEvents })
usersEvents.belongsTo(User)
usersEvents.belongsTo(Event)
Event.belongsToMany(User, { as: 'event', through: usersEvents })






/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Event,
  Content,
  organizerContacts,
  usersEvents,
  Comment
}

//172.16.21.47172
