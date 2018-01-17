const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const routerManager = require('./server/api/route-manager');
const fs = require('fs');
const path = require('path');
const https = require('https');
const helmet = require('helmet');

const app = express();
const env = process.env.environment;
// Express configuration (order matters)
app.set('port', (process.env.PORT || 4200));
const dbUrl = 'mongodb://mycookingbook:~c2[hW-F#^`GpPrU@localhost:27017/easycooking';

// Adding HSTS, removes the X-Powered-By header and sets the X-Frame-Options header to prevent click jacking, among other things.
app.use(helmet());

// Needed in order to read the body of the requests.
// Allowing bodies of up to 10mb. (for image upload)
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));


// To allow letsencrypt to renew the https certificate.
app.use('/.well-known', function(request, response, next) {
  response.sendFile(request.url, {root: __dirname + '/server/.well-known'});
});

// Directory routes to hide the structure of the project.
app.use(express.static(__dirname + '/server/dist'));

// Enabling CORS as we want to communicate with the server.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});


// Using the connection pool provided by the MongoClient driver to manage database connections.
// To make sure that we have it set up before we render the website, we are setting it in the
// promise of the connection pool.
mongoClient.connect(dbUrl, function(err, database) {
    if(err) throw err;

    if(env == 'dev') {
      app.listen(app.get('port'), function() {
        console.log('Dev server is running on port', app.get('port'));
      });
    }
    else if(env == 'prod') {
      // HTTPS options
      const options = {
          cert: fs.readFileSync(__dirname + '/server/sslcert/fullchain.pem'),
          key: fs.readFileSync(__dirname + '/server/sslcert/privkey.pem')
          //ca: fs.readFileSync(__dirname + '/server/sslcert/chain.pem')
      };

      https.createServer(options, app).listen(app.get('port'), function() {
        console.log('Secured Prod server is running on port', app.get('port'));
      });
    }
    else {
      console.error('You must set the "environment" environment variable in order to run server. "dev" or "prod".');
    }
     
    // Routing all of the database query to the api folder.
    app.use('/api', function (req, res) {
        res.header('Content-type', 'text/html');
        return res.end('Hello World!');
     });//routerManager(express, database));

    // Always send the index.html file. Angular's routing is handling the diffe$
    // url. That way, the page reload works when done with the browser.
    app.get('/*', function(request, response, next) {
      response.sendFile('index.html', {root: __dirname + '/server/dist'});
    });

});

