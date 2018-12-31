module.exports = function(socket) {
	socket.on('enter world', (data) => {
		try {
			// check connection is authenticated
			if(socket.hasOwnProperty('user')) {

				process.worldManager.getWorld("DEFAULT")
					.characterManager
					.addCharacters(data.characters, socket.user);
				
				socket.user.currentWorld = process.worldManager.getWorld("DEFAULT");

				// emit reply to load game	
				// with character info array
				socket.emit('entered world');
			}
		} catch(err) {
        	console.log("ERR: " + err.message);
      	}
	});
}