const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const routerManager = require('./route-manager');

const app = express();

const url = 'mongodb://localhost:27017/easycooking';

app.set('port', (process.env.PORT || 5000));

// Needed in order to read the body of the requests.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Enabling CORS as we want to communicate with the server.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
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
