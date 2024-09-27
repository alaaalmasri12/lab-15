'use strict';
require('dotenv').config();
var faker = require('faker');
const events=require('./events');
require('./caps');
setInterval(function () {
  require('./driver');
}, 1000);
function generateUsers() {
  let store = process.env.Store_Name;
  let randomName = faker.name.findName();
  let randomAdress = faker.address.streetAddress();
  let randomid = faker.random.number();

  let order = {
    storeName: store,
    customerName: randomName,
    customerAddress: randomAdress,
    customerId: randomid,
  };
  return { 'data': order };

}
const interval = setInterval(function () {
  events.emit('pickup',generateUsers());
}, 5000);


module.exports=generateUsers;

