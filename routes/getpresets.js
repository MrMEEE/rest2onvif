app.post('/api/getpresets/', function(req, res){
   console.log("Gettings Presets");
   console.log(req.body.profiletoken);

   let params = {
     'ProfileToken': camconfig.profile,
   };

   device.services.ptz.getPresets(params).then((result) => {
     res.send(JSON.stringify(result['data'], null, '  '));
   }).catch((error) => {
     console.error(error);
   });

});
