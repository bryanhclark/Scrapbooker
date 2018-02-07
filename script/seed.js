const faker = require('faker');
const Promise = require('bluebird');
const db = require('../server/db')
const { Comment, Event, Content, User } = require('../server/db/models');

function randNumBetween() {
  return Math.floor(Math.random() * numberImgs) + 1
}
// Type in how many fake people to make
const numberImgs = 16
const numberEvents = 5
const numberUsers = 6

function fillMurray() {
  let num1 = Math.floor(Math.random() * 123) + 300
  let num2 = Math.floor(Math.random() * 136) + 150
  return {src: `https://www.fillmurray.com/${num1}/${num2}`, width: num1, height: num2}
}

//Edit their fake info
function randImage() {
  let imgObj = fillMurray()
  let type = "image"
  return {
    src: imgObj.src,
    type: type,
    width: imgObj.width,
    height: imgObj.height,
    timeCreated: "Mon Jan 29 2018 16:14:27 GMT-0500 (EST)",
    orientation: 1
  }
}

function randUser() {
  let user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.phoneNumberFormat().split('-').join(''),
    email: faker.internet.email()
  }
  return user
}

function randEvent() {
  let event = {
    name: faker.lorem.word(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    startTime: "5:00PM",
    endTime: "6:30PM",
    organizerId: 1
  }
  return event
}


//MAKING AN ARRAY OF FAKE OBJECTS
function makeThisMany (number, callback) {
  const results = [];
  while (number--) {
    results.push(callback());
  }
  return results;
}

//GENERATE RANDOM IMAGES
function generateImgs () {
  const images = makeThisMany(numberImgs, randImage);
  return images;
}

function generateUsers () {
  const users = makeThisMany(numberUsers, randUser)
  return users
}

function generateEvents () {
  const events = makeThisMany(numberEvents, randEvent)
  return events
}


//SAVE CREATED STUFF
function createImgs () {
  return Promise.map(generateImgs(), image => Content.create(image))
}

function createUsers () {
  return Promise.map(generateUsers(), user => User.create(user))
}

function createEvents () {
  return Promise.map(generateEvents(), event => Event.create(event))
}


//SEED FUNCTION
function seed () {
  return Promise.all( [createImgs(), createUsers(), createEvents()] )
}

console.log('Syncing database');

db.sync({force: true})
  .then(() => {
    console.log('Seeding database');
    return seed();
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(() => {
    db.close();
    return null;
  })
