class User {
	constructor(socket, username) {
 		this.socket = socket; 

 		console.log("setting username: " + username);
 		this.username = username;
 		this.isConnected = true;
 		this.world = null;

 		this.charArr = null; // set in world

 		// TODO - create a timestamp of this login both in memory and on the database
 	}

 	onDisconnect() {
 		this.isConnected = false;

 		// TODO - create a timestamp of this logout on the database
 	}
}

module.exports = User;