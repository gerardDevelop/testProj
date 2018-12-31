'use strict'

process.databaseCodes = require('./enums/DatabaseCodes'); // used for messaging exclusively with database server
process.clientCodes = require('../client/dist/shared/ClientCodes');
process.messageKeys = require('../client/dist/shared/MessageKeys');
process.messageValues = require('../client/dist/shared/MessageValues');
process.commonEnums = require('../client/dist/shared/CommonEnums');
process.worldEventCodes = require('../client/dist/shared/WorldEventCodes');
process.worldEventKeys = require('../client/dist/shared/WorldEventKeys');
process.worldEventValues = require('../client/dist/shared/WorldEventValues');

const express = require('express');
const http = require('http');
const app = express();

//const socketSetup = require('./SocketRelated/SocketSetup'); // function
//const commonFunctions = require('./common/CommonFunctions');
//const Enums = require('./kinds/Enums');

//const UsersManager = require('./managers/UsersManager');
//const WorldsManager = require('./managers/WorldsManager');
//const MatchmakeManager = require('./managers/MatchmakeManager');

//const DatabaseClient = require('./database/DatabaseClient');
//process.databaseClient = new DatabaseClient();

app.use(express.static(__dirname + '/public'));
app.set('port', process.env.port || 8000);

/*

// test connection every so often and attempt to reconnect if broken
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(
  () => { console.log("Successfully connected to mongoDB") },
  err => { console.log( "Error connecting to mongoDB" )}
);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

*/

var server = http.Server(app);
var io = require('socket.io')(server);
process.socketio = io;

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

let DatabaseClient = require('./database/DatabaseClient');
process.databaseClient = new DatabaseClient();

require('./socket/SetupSocketHandlers')(io);

const SocketSender = require('./socket/SocketSender');

process.socketSender = new SocketSender(); // should be resonsible for all emits to clients

let UserManager = require('./managers/UserManager');
process.userManager = new UserManager();

let WorldsManager = require('./managers/WorldsManager');
process.worldsManager = new WorldsManager();

/*
var io = require('socket.io-client');

var clientSocket = io('http://localhost:8041');

clientSocket.on('connect', function(){
	console.log("connect");
});
clientSocket.on('event', function(data){
	console.log("event");
});
clientSocket.on('disconnect', function(){
	console.log('disconnect');
});
*/

// setup manager classes here, no need for a main manager class on the server to be honest

/*

process.ENUMS = new Enums();

process.connectionsManager = new ConnectionsManager({
	
});	

socketSetup();

process.usersManager = new UsersManager();

process.worldsManager = new WorldsManager();

process.matchmakeManager = new MatchmakeManager();

process.databaseManager = new DatabaseManager();

commonFunctions();

*/

/*

todo move this update loop to the mainManager class

/// ********** UPDATE LOOP *****************///

var frameLength = 1000 / 60; // divide by 60 for 60 fps
var newFrameTime = 0;
var prevFrameTime = 0;

// todo, calculate time differently
var timeUpdate = function() {

	//var hrTime = process.hrtime()
	//var currentTime = hrTime[0] * 1000 + hrTime[1] / 1000000;

	var currentTime = Date.now();

	if(currentTime > newFrameTime)
	{
		var deltaTime = currentTime - prevFrameTime;
		//deltaTime /= 1000;

		update(currentTime, deltaTime);

		prevFrameTime = currentTime;
		newFrameTime = currentTime + frameLength;
	}  
}

setInterval(timeUpdate, 1);

function update(currentTime, deltaTime) {
	try {
  		// update worlds
		process.worldsManager.update(deltaTime);
 		process.userManager.update(deltaTime);
 	} catch(err) {
 		console.log("error during update loop: " + err.message);
 	}
}

// todo make common functions; for now just place here

//process.addUserToPracticeQueue(socket.user);
//process.addUserToRankedQueue(socket.user);

// common functions should be declared here for now



