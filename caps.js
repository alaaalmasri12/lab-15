'use strict';
require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const events = require('./events');

require('./vendor');

events.on('pickup', payload => {
    log('pickup', payload);
})
events.on('delivered', payload => {
    deliverd('delivered', payload);
})
events.on('in-transit', payload => {
    transitlog('in-transit', payload);
})
function log(eventname, payload) {
    const date = new Date();
    console.log({ eventname, payload, date });
}
function transitlog(eventname, payload) {
    console.log({ eventname, payload});
}
function deliverd(eventname, payload) {
   console.log({eventname, payload});
   console.log(`VENDOR:Thank you for delivering ${payload.data.customerId}`);
}

app.listen(PORT, () => {
    console.log(`port is running at port${PORT} `);
});