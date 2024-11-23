app.post('/api/getposition/', function(req, res){
   console.log("Gettings Position");
   console.log(req.body.profiletoken);


   let params = {
     'ProfileToken': camconfig.profile,
   };

   device.services.ptz.getStatus(params).then((result) => {
     x = result['data'].GetStatusResponse.PTZStatus.Position.PanTilt.$.x;
     y = result['data'].GetStatusResponse.PTZStatus.Position.PanTilt.$.y;
     z = result['data'].GetStatusResponse.PTZStatus.Position.Zoom.$.x
     pos = {"x": x, "y": y, "z": z}
     res.send(JSON.stringify(pos));
   }).catch((error) => {
     console.error(error);
   }); 
   

});
