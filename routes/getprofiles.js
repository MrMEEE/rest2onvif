app.post('/api/getprofiles/', function(req, res){
   console.log("Gettings Profiles");
   console.log(req.body.profiletoken);

   let profile_list = device.getProfileList();

   res.send(JSON.stringify(profile_list, null, '  '));

});

