
"use strict";

/* eslint key-spacing: 0, no-use-before-define: 0 */

var sphero = require("sphero");
var orb = sphero("DD:3F:27:D5:69:EE");
var http = require('http');
var url = require('url');
var querystring = require('querystring');

function main() {
  connect(orb, function() {
    console.log("Spheros are connected, starting game.");
  });
}

// connects all spheros, triggering callback when done
function connect(orb, callback) {
  
  function done() {
  console.log("done done");
   orb.color(0x00ff00);
   callback();
  }
orb.connect(done);
  
}


var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if ('prenom' in params && 'nom' in params) {
        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?');
        //orb.connect(toto);
        //connect(orb);
        //main();
        //orb.color(0x0000ff);
    }
    //execute(say, "Hello");
    res.end();
});


main();
server.listen(8080);



/*"use strict";

var sphero = require("../");
var orb = sphero(process.env.PORT);
var http = require('http');
var url = require('url');
var querystring = require('querystring');

function done() {
   console.log("BB8 connected");
  }

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if ('prenom' in params && 'nom' in params) {
        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?');
        orb.connect();
        //orb.color(0x0000ff);
    }
    execute(say, "Hello");
    res.end();
});

function say(word) {
  console.log(word);




}

function execute(someFunction, value) {
  someFunction(value);
}



server.listen(8080);*/
