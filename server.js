'use strict';

//Requires Libraries
const restify = require('restify');
const mongoose = require('mongoose');

//Require routes
const routes = require('./route');

//Configuration file
const config = require('./configuration/config');

//Database
mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri);
var db = mongoose.connection;
db.on('error', (err) => {
    console.error(err);
    process.exit(1);
});
db.once('open', () => {
    console.log(`Database connection succesful to "${db.host}:${db.port}/${db.name}"`);
});

//Controller
var server = restify.createServer();

//Plugins
server.use(restify.plugins.jsonBodyParser());
server.use(restify.plugins.queryParser());

//Config Router
routes(server);

//Start the server
server.listen(config.port, function(){
    console.log('Listening at ' + server.name + ' ' + server.url);
});