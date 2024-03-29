/*const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');
const routerManager = require('./route-manager');
const https = require('https');
const helmet = require('helmet');
const fs = require('fs');

const app = express();
const env = process.env.environment;

// Adding HSTS, removes the X-Powered-By header and sets the X-Frame-Options header to prevent click jacking, among other things.
app.use(helmet());

// Needed in order to read the body of the requests.
// Allowing bodies of up to 10mb. (for image upload)
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

const url = 'mongodb://mycookingbook:~c2[hW-F#^`GpPrU@localhost:27017/easycooking';

app.set('port', (process.env.PORT || 5000));

// To allow letsencrypt to renew the https certificate.
app.use('/.well-known', function(request, response, next) {
  response.sendFile(request.url, {root: __dirname + '/.well-known'});
});


// Enabling CORS as we want to communicate with the server.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});

app.use(jwtMiddleware({ secret: 'mycookingbook-billie&keetah'})
   .unless({path: ['/login', '/', '/api/login', /\/.well-known*//*]}));

// Sending 401 status if an unauthorized error occurs
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log(err);
    res.status(401).send('Unauthorized');
  }
});


// Using the connection pool provided by the MongoClient driver to manage database connections.
// To make sure that we have it set up before we render the website, we are setting it in the
// promise of the connection pool.
mongoClient.connect(url, function(err, database) {
    if(err) throw err;

    // Routing all of the database query to the api folder.
    app.use('/api', routerManager(express, database));


    if(env == 'dev') {
      app.listen(app.get('port'), function() {
        console.log('API is running on port', app.get('port'));
      });
    }
    else if(env == 'prod') {
      // HTTPS options
      const options = {
        cert: fs.readFileSync(__dirname + '/../sslcert/fullchain.pem'),
        key: fs.readFileSync(__dirname + '/../sslcert/privkey.pem')
      };

      https.createServer(options, app).listen(app.get('port'), function() {
        console.log('Secured API is running on port', app.get('port'));
      });
    }
    else {
      console.error('You must set the "environment" environment variable in order to run api. "dev" or "prod".');
    }


});
*/
