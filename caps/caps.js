'use strict';
require('dotenv').config();
const net=require('net');
const PORT=process.env.PORT||3001;
const server=net.createServer();
let socketPool={
}
const events = require('../events');
server.on('connection', (socket)=> {
    const id = `Socket-${Math.random()}`; // uuid package
    console.log(`client with ID : ${id} is connected!!! `)
    socketPool[id] = socket;
    socket.on('data', (buffer)=> dispatchEvent(buffer)); 
    socket.on('error', (e) => {console.log("SOCKET ERR", e)});
    socket.on('end', (end) => {
        console.log("connection ended", end);
        delete socketPool[id];
});
});


server.on('error', (e)=> {
    console.log('SERVER ERROR', e);
});
function dispatchEvent(buffer) {
   
 
    let payload = JSON.parse(buffer.toString().trim());
    log('pickup', payload);
    transitlog('in-transit', payload);
    deliverd('delivered', payload); 
   
}

function broadcast(msg) {
   
    // Send the msg to all clients connected to you.
    let payload = JSON.stringify(msg);
    // We are sending the msg to all sockets by looping through them 
    // and using the socket object that we saved previously.
    for (let socket in socketPool) {
        socketPool[socket].write(payload);
    }
}
function log(eventname, payload) {
    const date = new Date();
    console.log({ eventname, payload, date });
    payload.eventname=eventname;
    broadcast(payload);
}
function transitlog(eventname, payload) {
    console.log({ eventname, payload});
    payload.eventname=eventname;
    broadcast(payload);
}
function deliverd(eventname, payload) {
   console.log({eventname, payload});
   payload.eventname=eventname;
   broadcast(payload);
}

server.listen(PORT, ()=> console.log(`Server is up on ${PORT}`));
