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
