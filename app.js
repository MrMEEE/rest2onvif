#!/usr/bin/node

var express = require('express');
var app = express();
var config = require('./config');
const onvif = require('node-onvif');

// Create an OnvifDevice object
let device = new onvif.OnvifDevice({
  address: config.address,
  user : config.user,
  pass : config.pass,
});

device.init();

app.use(express.json());

app.get('/api/', function (req, res) {
   res.send('PTZPROXYAPI is Ready');
})

app.post('/api/', function(req, res){
   console.log(req.body);      // your JSON
   console.log(req.body.title);
   res.send(req.body);    // echo the result back
});

app.post('/api/ptzmove/', function(req, res){
   console.log("Moving Camera");
   console.log(req.body.x+":"+req.body.y+":"+req.body.z+"."+req.body.timeout);
   device.ptzMove({
      'speed': {
        x: parseFloat(req.body.x), // Speed of pan (in the range of -1.0 to 1.0)
        y: parseFloat(req.body.y), // Speed of tilt (in the range of -1.0 to 1.0)
        z: parseFloat(req.body.z)  // Speed of zoom (in the range of -1.0 to 1.0)
      },
      'timeout': parseFloat(req.body.timeout) // seconds
   });

   res.send("Moving Camera");

});

app.post('/api/gotopreset/', function(req, res){
   console.log("Moving Camera to Preset");
   console.log(req.body.profiletoken+":"+req.body.presettoken);
   
   let params = {
     'ProfileToken': req.body.profiletoken,
     'PresetToken' : req.body.presettoken,
     'Speed'       : {'x': config.defaultxspeed, 'y': config.defaultyspeed, 'z': config.defaultzspeed}
   };

   device.services.ptz.gotoPreset(params);

   res.send("Moving Camera to Preset");

});

app.listen(config.port,config.host);

console.log("PTZ Proxy API is Ready and running on: "+config.host+":"+config.port);

