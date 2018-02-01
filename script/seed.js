const faker = require('faker');
const Promise = require('bluebird');
const db = require('../server/db')
const { Event, Content, User } = require('../server/db/models');

//Type in how many fake people to make
const numberImgs = 6
const numberEvts = 3

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

//MAKING AN ARRAY OF FAKE PEOPLE OBJECTS
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

//SAVE CREATED STUFF
function createImgs () {
  return Promise.map(generateImgs(), image => Content.create(image))
}

// EVENTS
const events = [
  Event.create({name: 'Friends and Family Night', startTime: 1517332794, endTime: 1517347194}),
  Event.create({name: 'Wedding of Sally', startTime: 1517332794, endTime: 1517347194}),
  Event.create({name: 'Demo Day', startTime: 1517332794, endTime: 1517347194})
]

// USERS
const users = [
  User.create({firstName: 'Jeff', lastName: 'Jeffington', email: 'jeff@jeffington.com', password: '123'}),
  User.create({firstName: 'Sally', lastName: 'Sallington', email: 'sally@sallington.com', password: '123'}),
  User.create({firstName: 'Mark', lastName: 'Markington', email: 'mark@markington.com', password: '123'})
]

function seed () {
  return Promise.all( [createImgs(), users, events ] )
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
