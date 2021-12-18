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

