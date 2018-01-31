const User = require('./user')
const Event = require('./event')
const Content = require('./content')
const Contact = require('./contacts')
const ContactsEvents = require('./ContactsEvents')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Event.belongsTo(User, { as: 'organizer' })
Contact.belongsTo(User, { as: 'organizer' })
Contact.belongsToMany(Event, { through: ContactsEvents })
Event.belongsToMany(Contact, { through: ContactsEvents })
Content.belongsTo(User)
Content.belongsTo(Event)
Event.belongsTo(User)

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
  Contact,
  ContactsEvents
}
