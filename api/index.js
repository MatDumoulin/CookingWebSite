const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const jwtMiddleware = require('express-jwt');
const routerManager = require('./route-manager');


const app = express();

// Allowing bodies of up to 50mb. (for image upload)
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

const url = 'mongodb://mycookingbook:~c2[hW-F#^`GpPrU@localhost:27017/easycooking';

app.set('port', (process.env.PORT || 5000));

// Needed in order to read the body of the requests.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Enabling CORS as we want to communicate with the server.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});

app.use(jwtMiddleware({ secret: 'mycookingbook-billie&keetah'}).unless({path: ['/login', '/', '/api/login']}));

// Sending 401 status if an unauthorized error occurs
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
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

    //
    app.listen(app.get('port'), function() {
      console.log('API is running on port', app.get('port'));
    });
});

