const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const SERVER_PORT = 5959;

let mimeTypes = {
  "html": "text/html",
  "gif": "image/gif",
  "js": "text/javascript"
};

const getFileExtensionOrEmptyString = (filePath) => {
  const index = filePath.lastIndexOf('.');
  return (index < 0) ? '' : filePath.substr(index);
}

const getMimeType = (urlpath) => {
  const ext = getFileExtensionOrEmptyString(urlpath).replace('.', '');
  return mimeTypes[ext.toLowerCase()] || "application/octet-stream";
};

const serveFile = (response, pathName, mime) => {
  fs.readFile(__dirname + '/' + pathName, function (err, data) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      return response.end('Error loading ' + pathName + " with Error: " + err);
    }
    response.writeHead(200, { "Content-Type": mime });
    response.end(data);
  });
}

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

// app.get('/', function (req, res) {
//   res.send('hello, world!')
// })

app.get(['', '/:resource'], function (req, res) {
  // console.log(`${req.method} request received from ${req.originalUrl} ${req.ip} : ${req.protocol}`);
  // const resource = req.param('resource');
  // console.log(`${resource}`);
  let resource = req.params['resource'] ? req.params['resource'].replace('/', '') : '';
  if (req.path === '' || req.path === '/') {
    console.log(`we served index.html for resource: ${resource}`);
    res.sendFile(path.join(__dirname, '/index.html'));
    return;
  }
  if (resource === 'up.gif' || resource === 'down.gif' || resource === 'bundle.js') {
    let mime = getMimeType(req.path);
    serveFile(res, resource, mime);
    return;
  }
  console.log(`we cut this request returned 404`);
  return res.sendStatus(404);
});

app.listen(SERVER_PORT);