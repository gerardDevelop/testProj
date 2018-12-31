const express = require('express');
const http = require('http');
const app = express();

const mongoose = require('mongoose');
const mongoURI = require('./config/keys').mongoURI;
const bcrypt = require('bcryptjs');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.port || 8041);

// test connection every so often and attempt to reconnect if broken
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(
  () => { console.log("Successfully connected to mongoDB") },
  err => { console.log( "Error connecting to mongoDB" )}
);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = http.Server(app);
const socketio = require('socket.io')(server);
process.socketio = socketio;

process.databaseCodes = require('../server/enums/DatabaseCodes'); // point to server .. todo now
process.messageKeys = require('../client/dist/shared/MessageKeys'); // point to client message keys

const setupSocket = require('./socket/SetupSocket');
setupSocket(socketio);

server.listen(app.get('port'), function() {
  console.log('Database server listening on port ' + app.get('port'));
});

