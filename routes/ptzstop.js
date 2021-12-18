app.post('/api/ptzstop/', function(req, res){
   console.log("Stopping Camera Movement");
   device.ptzStop();

   res.send("Stopping Camera Movement");

});
