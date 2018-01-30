const faker = require('faker');
const Promise = require('bluebird');
const db = require('../server/db')
const { Events, Content } = require('../server/db/models');

//Type in how many fake people to make
const howManyToMake = 12;

function fillMurray() {
  let num1 = Math.floor(Math.random() * 100) + 100
  let num2 = Math.floor(Math.random() * 100) + 300
  return `https://www.fillmurray.com/${num1}/${num2}`
}

//Edit their fake info
function randImage() {
  let downloadURL = fillMurray()
  let type = "image"
  return {
    downloadURL: downloadURL,
    type: type
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

//GENERATE RANDOM PEOPLE
function generate () {
  const images = makeThisMany(howManyToMake, randImage);
  return images;
}

//SAVE CREATED STUFF
function create () {
  return Promise.map(generate(), image => Content.create(image))
}

function seed () {
  return Promise.all( [create()] )
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
