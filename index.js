const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const routerManager = require('./api/index');

const app = express();

const url = 'mongodb://localhost:27017/easycooking';

app.set('port', (process.env.PORT || 5000));

// Needed in order to read the body of the requests.
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Directory routes to hide the structure of the project.
app.use(express.static(__dirname));


// Using the connection pool provided by the MongoClient driver to manage database connections.
// To make sure that we have it set up before we render the website, we are setting it in the
// promise of the connection pool.
mongoClient.connect(url, function(err, database) {
    if(err) throw err;

    // Routing all of the database query to the api folder.
    app.use('/api', routerManager(express, database));

    //
    app.listen(app.get('port'), function() {
      console.log('Node app is running on port', app.get('port'));
    });
});

if(process.env.ENV == 'prod') {
  console.log('Server is running in prod mode.');
  app.get('/', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html');
  });
}
