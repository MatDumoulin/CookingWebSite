const express = require('express');

const app = express();
app.set('port', (process.env.PORT || 4200));


// Directory routes to hide the structure of the project.
app.use(express.static(__dirname + '/dist'));

// Enabling CORS as we want to communicate with the API.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(app.get('port'), function() {
  console.log('Prod server is running on port', app.get('port'));
});

// Always send the index.html file. Angular's routing is handling the different
// url. That way, the page reload works when done with the browser.
app.get('/*', function(request, response, next) {
  response.sendFile(__dirname + '/dist/index.html');
});
