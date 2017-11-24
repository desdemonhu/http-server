'use strict';

const http = require('http');
const url = require('url');
const animalSay = require('./animal-say.js');

///Format response to be sent by server
let sendResponse = function(res, status, body){
  res.writeHead(status, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
};


///server requests
const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);

  if (req.method === 'Get'){
    ///various get requests
    if(req.url.pathname === '/'){
      sendResponse(res, 200, 'This is a response');
    }
  }
  else if (req.method === 'Post') {
    ///post requests
  }


});
