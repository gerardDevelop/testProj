const User = require('../types/User');

class UserManager {
	constructor() {
		process.users = {};
	}

	// called from databaseClient
	onLogin(socketId, username) {
		
		console.log('SOCKETID: ' + socketId);

		var socket = process.socketio.sockets.connected[socketId];
		socket.isLoggedIn = true;					

		// create a user object
		const user = new User(socket, username);

		socket.user = user;

		process.users[username] = user;  

		process.socketSender.sendLoginSuccessResponse(socket, username);			
	}

	update(deltaTime) {
		// not sure what to do here..

		// perhaps monitor if user is dc'd and after a certain timeout, remove them from the users list
	}
}

module.exports = UserManager;