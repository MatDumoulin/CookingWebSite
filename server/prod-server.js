const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Express configuration (order matters)
app.set('port', (process.env.PORT || 4200));
// Directory routes to hide the structure of the project.
app.use(express.static(__dirname + '/dist'));

// Enabling CORS as we want to communicate with the API.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});


// Express routes
app.listen(app.get('port'), function() {
  console.log('Prod server is running on port', app.get('port'));
});


// This path is used for HTTPS certification.
app.get('/.well-known/acme-challenge/*', function(request, response, next) {
  const filepath = path.join(__dirname, "https", request.path);

  if(fs.existsSync(filepath)) {
      response.sendFile(filepath);
  }
  else {
    response.sendStatus(404);
  }
});


// Always send the index.html file. Angular's routing is handling the different
// url. That way, the page reload works when done with the browser.
app.get('*', function(request, response, next) {
  response.sendFile('index.html', {root: __dirname + '/dist'});
});
