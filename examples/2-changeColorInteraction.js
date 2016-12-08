"use strict";

/* eslint key-spacing: 0, no-use-before-define: 0 */

var sphero = require("../");
var orb = sphero(process.env.PORT);
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var express = require('express');
/*
 * body-parser is a piece of express middleware that 
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body` 
 *
 * 'body-parser' must be installed (via `npm install --save body-parser`)
 * For more info see: https://github.com/expressjs/body-parser
 */
 var bodyParser = require('body-parser');

// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());
app.use(express.static('images'));

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
/*app.get('/', function(req, res){
  // The form's action is '/' and its method is 'POST',
  // so the `app.post('/', ...` route will receive the
  // result of our form
  var html = '<form action="/" method="post">' +
               'Enter your name:' +
               '<input type="text" name="userName" placeholder="..." />' +
               '<br>' +
               '<button type="submit">Submit</button>' +
            '</form>';
               
  res.send(html);
});
*/


app.get('/getDirection', function (req, res) {
  var query = req.query;

  switch (query.direction){
    case  "droite" :
    orb.roll(155,0); 
    console.log("droite"); 
    break;
    
    case  "gauche" :
    orb.roll(155,90);  
    break;
    
    case  "bas" :
    orb.roll(155,180);  
    
    break;
    
    case  "haut" :
    orb.roll(155,270);      
    break;
  }

  




});


app.get('/getValues', function (req, res) {
  var query = req.query;
  switch (query.selectpicker2){
    case  "gyro" :
    //orb.streamGyroscope();
    //var opts = {
      //    sps:5,

        //};
        orb.streamGyroscope(0.1);    
        break;
      }
    });

orb.on("gyroscope", function(data) {
  console.log("data:");
  console.log("  xGyro:", data.xGyro);
  console.log("  yGyro:", data.yGyro);
  console.log("  zGyro:", data.zGyro);
});

app.get('/', function(request, response) {
  response.sendfile('./2-form.html');
});

app.get('/getJson', function (req, res) {
    // If it's not showing up, just use req.body to see what is actually being passed.
    var query = req.query;
  console.log(); // [ 'opel', 'saab' ]
//orb.streamGyroscope(0);

switch (query.selectpicker){
  case  "red" :
  orb.color(0xff0000);
  break;
  case  "green" :
  orb.color(0x00ff00);
  break;
  case  "blue"  :
  orb.color(0x0000ff);
  break;
}



});

// This route receives the posted form.
// As explained above, usage of 'body-parser' means
// that `req.body` will be filled in with the form elements
app.post('/', function(req, res){

  //var html = 'Hello: ' + userName + '.<br>' +
   //          '<a href="/">Try again.</a>';

  //res.send(html);
  res.sendfile('./1-form.html');
});



function main() {
  connect(orb, function() {
    console.log("Spheros are connected, starting game.");
  });
}

// connects all spheros, triggering callback when done
function connect(orb, callback) {
 function ping(){
 console.log("ping.");
 }
  function done() {
    console.log(__dirname);    
     orb.detectCollisions({device: "bb8"});
  orb.color("green");

  orb.on("collision", function(data) {
    console.log("collision detected");
    console.log("  data:", data);

    orb.color("red");

    setTimeout(function() {
      orb.color("green");
    }, 1000);
  });

  

  
    callback();
  }
  orb.connect(done);
}

main();
app.listen(5000);


// var express = require('express');
// var server = express();
// var sphero = require("../");
// var orb = sphero(process.env.PORT);
// var bodyParser = require("body-parser");
// server.use(bodyParser.urlencoded({ extended: true }));

// server.get('/', function(request, response) {
// 	response.sendfile('./1-form.html');
// });

// server.post('./post.html',function(request,response)
// {
// 	response.sendfile('./1-form.html');
// 	var p1=request.body.p1;
// 	console.log("p1="+ P1);
// }


// 	);

// function main() {
//   connect(orb, function() {
//     console.log("Spheros are connected, starting game.");
//   });
// }

// // connects all spheros, triggering callback when done
// function connect(orb, callback) {

//   function done() {
//   console.log("done done");
//    orb.color(0x00ff00);
//    callback();
//   }
// orb.connect(done);

// }

// main();
// server.listen(8050);
