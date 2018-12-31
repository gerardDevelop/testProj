const Being = require('./Being');
const uuidv1 = require('uuid/v1');
const WEventManager = require('../managers/WEventManager');
const ProjectileManager = require('../managers/ProjectileManager');

class World {
 	constructor(config) {
 		this.worldName = config.worldName;
 		this.blueprint = config.blueprint;
 		this.capacity = config.capacity; // number of users
 		this.socketRoomId = uuidv1(); // placeholder, for now, utilize an inrementor type 

 		this.wEventManager = new WEventManager(this);
 		this.projectileManager = new ProjectileManager();

 		this.users = {};
 		this.beings = {};
 		this.things = {};

 		this.refnoIncr = 1;
 	}

 	update(deltaTime) {

 		// update beings
 		Object.values(this.beings).forEach(being => {
 			being.update(deltaTime);
 		});

 		// things should be updated separately
 		Object.values(this.things).forEach(thing => {
 			thing.update(deltaTime);
 		});

 		this.wEventManager.update(deltaTime);
 	}	

 	// world should be concerned with spawning beings, not with user details of spawning
 	addBeing(beingName, x, y, kind) {

 		const being = new Being(this, beingName, this.refnoIncr, x, y, kind);		
 		this.beings[this.refnoIncr] = being;
		this.refnoIncr++;

 		return being;
 	}

 	removeBeing(being) {
 		// notify users that the being is being removed
 		// (register it as a worldEvent)

 		// TODO
 	}

 	shutdownWorld() {
 		// send off messages to each user that the world is shutting down
 		Object.values(this.users).forEach(user => {
 			// send shutdown message
 			process.SocketSender.SendWorldShutdownMessage(this.socketRoomId);
 		});
 	}

 	onNpcSpawn() {
 		// for spawning npcs.. 
 		// todo: notify users
 	}

 	onUserJoin(user, charDataArray) {

 		// check capacity
 		if(Object.keys(this.users).length < this.capacity) {

 			// if this a matchmake match, check that the user can connect

	 		// check if user is already connected to this world
	 		if(this.users.hasOwnProperty(user.username)) {
	 			console.log("user already connected, sending user details of already spawned beings");
	 		} else {
	 			console.log("spawning new beings for user");

	 			const charArray = []; // used for the other users already connected
	 			const exportCharArray = []; // used to send into to other users 
	 			var otherBeingsArray = []; // used to send info about all other beings to new user

	 			Object.values(this.beings).forEach(being => {
	 				// export being and add it to array
	 				otherBeingsArray.push(being.export());
	 			});

	 			// spawn beings
	 			charDataArray.forEach(charData => {

	 				// todo: change x, y from Math.random to something more substantial

	 				// instantiate this being into a new Array
	 				const being = this.addBeing(charData[process.messageKeys.CHARACTER_NAME], 
	 	 				Math.random() * 400, Math.random() * 400);

	 				being.beingType = process.commonEnums.beingTypes.CHARACTER;
	 				being.user = user;

	 				being.beingClass = charData[process.messageKeys.CHARACTER_TYPE];
	 				being.isNPC = false;

	 				being.onInitCharacter();

	 				charArray.push(being);
	 				exportCharArray.push(being.export());
	 			});

	 			user.socket.join(this.socketRoomId);	
	 			
	 			user.world = this;

	 			user.charArr = charArray;

	 			var successObj = {};

	 			successObj[process.messageKeys.WORLD_NAME] = this.worldName;
	 			successObj[process.messageKeys.WORLD_BLUEPRINT] = this.blueprint;
	 			successObj[process.messageKeys.MY_CHARACTERS_ARRAY] = exportCharArray;
	 			successObj[process.messageKeys.OTHER_BEINGS_ARRAY] = otherBeingsArray;

	 			// need to send the spawn message to the joining client separately, because 
	 			// the spawnEvent emitted to all clients might arrive before the enter world success
	 			// message

	 			// send socket message directly to logging in user that a successful spawn has taken place
	 			process.socketSender.sendEnterWorldSuccessResponse(user.socket, successObj);

	 			this.wEventManager.createSpawnEvent(charArray[0]);

	 			this.wEventManager.createSpawnEvent(charArray[1]);

	 		}
 		} else {
 			// send back message that world capacity is full
 			process.socketSender.sendEnterWorldFailureResponse(user.socket, "capacity full"); // send hard string for now
 		}	

 		// if already connected, just give the client the details of already spawned beings

 		// else, spawn beings based on data
 	}

 	removeUser(user) {

 	}

 	onUserDisconnect(user) {
 		console.log("user: " + user.username + " disconnected.");
 		console.log('marking ' + user.beings[0].beingName + ' and ' + user.beings[1].beingName + ' as disconnected.');
 		// (mark each being as disconnected and perhaps send an event to nearby users that the beings are disconnected)
 		// (or perhaps just allies, it could give enemy players an unfair advantage to know precisely when a d/c occurs)
 	}
}

module.exports = World;