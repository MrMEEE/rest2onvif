app.post('/api/setpreset/', function(req, res){
   console.log("Saving Preset");
   console.log(req.body.profiletoken+":"+req.body.presettoken);

   let params = {
     'ProfileToken': req.body.profiletoken,
     'PresetToken' : req.body.presettoken,
     'Speed': 0
   };

   device.services.ptz.setPreset(params);

   res.send("Saving Preset");

});

