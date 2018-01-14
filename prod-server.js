const express = require('express');
const fs = require('fs');
const path = require('path');
const https = require('https');
const helmet = require('helmet');
const app = express();

// Express configuration (order matters)
app.set('port', (process.env.PORT || 4200));

// Adding HSTS, removes the X-Powered-By header and sets the X-Frame-Options header to prevent click jacking, among other things.
app.use(helmet());

app.use("/api/*", function(request, response, next) {
  console.log("Request made to api route:");
  console.log(request);
  return response.sendStatus(403);
});

app.use("/sslcert/*", function(request, response, next) {
  console.log("Request made to sslcert route:");
  console.log(request);
  return response.sendStatus(403);
});

// Directory routes to hide the structure of the project.
app.use(express.static(__dirname + '/server', {dotfiles:'allow'}));
app.use(express.static(__dirname + '/server/dist'));
// Enabling CORS as we want to communicate with the API.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});


// HTTPS options
const options = {
    cert: fs.readFileSync(__dirname + '/server/sslcert/fullchain.pem'),
    key: fs.readFileSync(__dirname + '/server/sslcert/privkey.pem')
};

https.createServer(options, app).listen(app.get('port'), function() {
  console.log('Secured Prod server is running on port', app.get('port'));
});


// Always send the index.html file. Angular's routing is handling the different
// url. That way, the page reload works when done with the browser.
app.get('/*', function(request, response, next) {
  response.sendFile('index.html', {root: __dirname + '/server/dist'});
});

