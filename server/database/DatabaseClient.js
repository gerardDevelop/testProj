
const io = require('socket.io-client');

class DatabaseClient {
	constructor() {
		this.socket = io('http://localhost:8041');

		if(this.socket) {

			this.socket.on('connect', () => {
				console.log("on connect to database");
			});

			this.socket.on(process.databaseCodes.REGISTRATION_RESPONSE_SUCCESS, (data) => {
				try {
					var socketId = data[process.messageKeys.USER_SOCKET_ID];

					console.log("received registration success response from database server");

					// TODO: send back a reply to client of successful registration

					// (use socket sender)

				} catch(err) {
					console.log("Error reported in databaseClient during socket receiving databaseCodes.REGISTRATION_RESPONSE_SUCCESS: " + err);
				} 
			});

			this.socket.on(process.databaseCodes.REGISTRATION_RESPONSE_FAILURE, (data) => {
				try {
					var socketId = data[process.messageKeys.USER_SOCKET_ID];

					console.log("received registration failure response from database server");

					// TODO: send back a reply to client of failure to register
				} catch(err) {
					console.log("Error reported in databaseClient during socket receiving databaseCodes.REGISTRATION_RESPONSE_FAILURE: " + err);
				}
			});

			this.socket.on(process.databaseCodes.LOGIN_RESPONSE_SUCCESS, (data) => {
				try {	

					const socketId = data[process.messageKeys.USER_SOCKET_ID];
					const username = data[process.messageKeys.USERNAME];

					console.log("received login success response from database server from " + socketId + 
						"for username: " + username);

					process.userManager.onLogin(socketId, username); //TODO - socketSender to send message to client

				} catch(err) {
					console.log("Error reported in databaseClient during socket receiving databaseCodes.LOGIN_RESPONSE_SUCCESS: " + err);
				}
			});

			this.socket.on(process.databaseCodes.LOGIN_RESPONSE_FAILURE, (data) => {
				try {
					var socketId = data[process.messageKeys.USER_SOCKET_ID];
					console.log("received login failure response from database server" + socketId);

					// get socket and reason
					var socket = process.socketio.sockets.connected[socketId];

					// use data.reason && socketSender to send info to client
					process.socketSender.sendLoginFailureResponse(socket, data.reason);
				} catch(err) {
					console.log("Error in databaseClient during socket receiving databaseCodes.LOGIN_RESPONSE_FAILURE: " + err.message);
				}
			});

		} else {
			console.log("err setting up connection with database server");
		}
	}

	onLoginRequest(reqData) {
		// send request to database server for login, comes back with failure or success and data	
		this.socket.emit(process.databaseCodes.LOGIN_REQUEST, reqData);
	}

	onRegistrationRequest(reqData) {
		// send request to database server for registration, comes back with failure or success and data	
		this.socket.emit(process.databaseCodes.REGISTRATION_REQUEST, reqData);
	}
}

module.exports = DatabaseClient;