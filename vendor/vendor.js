'use strict';
require('dotenv').config();
const faker = require('faker');
const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;
client.connect(PORT, HOST, ()=> {console.log('logger got connected');});
const messages = [];
client.on('data', function(data){ 
  // when the server sends me back any data
  let eventObj = JSON.parse(data);
  if (eventObj.eventname == 'delivered') {
    console.clear();
    messages.push(eventObj.payload);
    // console.log('Thank you for delivering' );
    messages.forEach(msg=> console.log(`Thank you for delivering ${eventObj.id}`));
  }
});
setInterval(
  function () {
    let obj={storeName:process.env.Store_Name,
      customerName:faker.name.findName(),
      address:faker.address.streetAddress(),
      id:faker.random.number()
      };
      console.log(obj);
    let event = JSON.stringify(obj);
    client.write(event);
  },5000);
