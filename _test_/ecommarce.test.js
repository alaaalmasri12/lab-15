'use strict';
var spies = require('spies');
var spy = spies();
let fakedata=require('../vendor');
 describe(' event handler function',()=>{
     it('pickup test',()=>{
        console.log(fakedata);
        spy.on('pickup',payload=> {
            expect( console.log(log('pickup', payload))).tobeEqual()
           
            spy.log( log('pickup', payload));
        });   
     })
 })

