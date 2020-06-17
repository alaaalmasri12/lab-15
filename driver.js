'use strict';
const events=require('./events');
require('./caps');
events.on('pickup', payload => {
  setTimeout(
    function(){driverlog(payload), 1000; });        
});
function driverlog(payload)
{
  console.log(`DRIVER: picked up ${payload.data.customerId}`);
  events.emit('in-transit',payload);
  setTimeout(function(){events.emit('delivered',payload);}, 3000); 
}
