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
   res.send('Rest2OnVif is Ready');
})

app.post('/api/', function(req, res){
   console.log(req.body);      // your JSON
   console.log(req.body.title);
   res.send(req.body);    // echo the result back
});

var glob = require( 'glob' )
  , path = require( 'path' );

glob.sync( './routes/*.js' ).forEach( function( file ) {
  require( path.resolve( file ) );
});

app.listen(config.port,config.host);

console.log("Rest2OnVif is Ready and running on: "+config.host+":"+config.port);

