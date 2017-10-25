'use strict';
const router = require('express').Router();
const path = require('path');
var execProcess = require("./sample.js");

router.post('/restartJavaApp', function(req, res, next) {
  var tool = req.body.tool;
  // let pathData = path.join(__dirname, './bash').replace(``\``,`/`);
  let pathToBash = "sh "+ path.join(__dirname, `./bash/${tool}.sh`);
  execProcess.result(pathToBash , function(err, response){
      console.log("inside execProcess ",pathToBash);
      if(!err){
        console.log(response);
       res.send("success");
      } else {
       console.log(err);
      }
   });
});


module.exports = router;
