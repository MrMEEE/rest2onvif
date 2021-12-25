#!/usr/bin/node

var express = require('express');
var app = express();
var glob = require('glob');
var fs = require('fs');

const onvif = require('node-onvif');

if (fs.existsSync(__dirname+'/config.js')) {
   var config = require(__dirname+'/config');
}else if (fs.existsSync('/etc/rest2onvif/config.js')){
   var config = require('/etc/rest2onvif/config');
}else{
   console.log("Couldn't locate configuration file")
   process.exit(1)
}

function requestRetry() {
  let devicetemp = new onvif.OnvifDevice({address: config.address, user : config.user, pass : config.pass});
  console.log("Start");
  function run() {
	  console.log("Running");
          devicetemp.init().then((info) => {
          // Show the detailed information of the device.
             console.log(JSON.stringify(info, null, '  '));
             console.log("Connected");
             return devicetemp;

          }).catch((error) => {
             console.error(error);
             console.log("Retrying");
             setTimeout(run, 2000);
          });

  }
  run();

}


device = requestRetry(); 

app.use(express.json());

app.get('/api/', function (req, res) {
   res.send('Rest2OnVif is Ready');
})

app.post('/api/', function(req, res){
   console.log(req.body);      // your JSON
   console.log(req.body.title);
   res.send(req.body);    // echo the result back
});

glob.sync(__dirname+'/routes/*.js' ).forEach( function( file ) {
   console.log("Loading operation: "+file);
   eval(fs.readFileSync(file)+'');
});

app.listen(config.port,config.host);

console.log("Rest2OnVif is Ready and running on: "+config.host+":"+config.port);

