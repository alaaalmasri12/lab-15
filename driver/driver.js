'use strict';
require('dotenv').config();
const net = require('net');

const client = new net.Socket();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3001;

client.connect(PORT, HOST, ()=> {console.log('logger got connected')});

client.on('data', function(data) {
    let event = JSON.parse(data); // {event: event, paypload: payload}
    console.log(event.eventname,event.id );
});

client.on('close', function() {
    console.log('Logger Connection got closed');
});