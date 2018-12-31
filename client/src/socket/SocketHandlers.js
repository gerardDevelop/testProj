import cUser from '../types/cUser';

class SocketHandlers {
	
	constructor(socket) {

		/*
		todo - receive 
			- login response
			- register response
			- matchmake response
			- left world response
		 */

		if(socket) {

			console.log("setting socket responses");

			socket.on(window.clientCodes.LOGIN_RESPONSE_SUCCESS, username => {
				console.log("received login success for username: " + username);

				// construct user object
				window.user = new cUser(username);

				window.changeAppPage("dashboard");
				
				// utilize the login data object
				window.onReceiveLogin(username);
			});

			socket.on(window.clientCodes.ENTER_WORLD_SUCCESS_RESPONSE, data => {

				// create a world object - the world is primarily a model class
				// populate it with the beings sent in this message
				// from the model, create sprites

				// hide react UI
				window.changeAppPage("in main");
				window.inGame = true;

				window.mainScene.startNewWorld();

				var myCharArray = data[window.messageKeys.MY_CHARACTERS_ARRAY];

				var otherBeingArray = data[window.messageKeys.OTHER_BEINGS_ARRAY];

				window.main.world.addMyCharacters(myCharArray);

				otherBeingArray.forEach(being => {
					console.log("RECEIVED INFO ABOUT ANOTHER BEING, refno: " + being[window.worldEventKeys.BEING_REFNO]);
					window.main.world.addOtherBeing(being);
				});

				window.actionBarManager.init();

				

				/*

				// ok quick test:
				newCharArray.forEach(char => {
					console.log(" " + char[window.worldEventKeys.BEING_NAME]);
					console.log(" " + char[window.worldEventKeys.BEING_REFNO]);
					console.log(" " + char[window.worldEventKeys.BEING_POSITION_X]); 
					console.log(" " + char[window.worldEventKeys.BEING_POSITION_Y]);
					console.log(" " + char[window.worldEventKeys.BEING_HEALTH]); 
					console.log(" " + char[window.worldEventKeys.BEING_MANA]); 
					console.log(" " + char[window.worldEventKeys.BEING_BEINGCLASS]); 
					console.log(" " + char[window.worldEventKeys.BEING_USERNAME]); 
					console.log(" " + char[window.worldEventKeys.BEING_TOTAL_HEALTH]); 
					console.log(" " + char[window.worldEventKeys.BEING_TOTAL_MANA]);
					// maybe send effects as well (some beings could spawn with permanent passive effects/buffs on them)
					console.log(" " + char[window.worldEventKeys.BEING_EFFECTS]); 
				});

				*/

				// ok... 

				// world blueprint can be ignored for now
				// exportCharArray is of definite importance
				
			});

			socket.on(window.clientCodes.WORLD_SEND_EVENTS, eventArr => {
				eventArr.forEach(event => {
					//console.log("eventType: " + event[window.worldEventKeys.EVENT_TYPE]);
					 var eventType = event[window.worldEventKeys.EVENT_TYPE];

					 if(eventType === window.worldEventCodes.BEING_SPAWN) {
					 	
					 	var refno = event[window.worldEventKeys.BEING_REFNO];

					 	console.log("new spawn event for being, refno: " + refno);

					 	if(!window.world.hasBeing(refno)) {
					 		console.log("world does not have being, spawning.");

					 		window.world.spawnFromEvent(event);

					 	} else {
					 		console.log("World already has being, not spawning");
					 	}

					 } else if(eventType === window.worldEventCodes.BEING_CHANGE_POSITION) {
					 	// todo - implement this

					 	var refno = event[window.worldEventKeys.BEING_REFNO];
					 	var x = event[window.worldEventKeys.BEING_POSITION_X];
					 	var y = event[window.worldEventKeys.BEING_POSITION_Y];
					 	var being = window.world.beings[refno];

					 	being.onReceiveNewPosition(x, y);	

					 } else if(eventType === window.worldEventCodes.ATTACK) { // (todo add this to a combat log class too)
							 	
					 	var attackingBeing = window.world.beings[event[window.worldEventKeys.BEING_REFNO]];
						var targetedBeing = window.world.beings[event[window.worldEventKeys.TARGET_REFNO]];
						var damage = event[window.worldEventKeys.DAMAGE];

						// example combat log statement
						//console.log("Being " + attackingBeing.refno + " attacked " + targetedBeing.refno + " for " + damage + " damage.");

						// apply damage to the cBeing model
						targetedBeing.applyDamage(damage);

						// apply some kind of flashing effect on the affected being, (like a very quick, 
							// temporary white or red flash, with perhaps a blood spray animation)

						// apply some kind of animation effect on the attacking being
						// for now this may just be some kind of weapon rotation effect like nuclear throne

						// (optional) display the damage as a floating damage number

					 } else if(eventType === window.worldEventCodes.INSTANT_OFFENSIVE_ABILITY_EXECUTION) {

					 	var castingBeing = window.world.beings[event[window.worldEventKeys.BEING_REFNO]];
						var targetedBeing = window.world.beings[event[window.worldEventKeys.TARGET_REFNO]];
						var abilityCode = event[window.worldEventKeys.ABILITY_CODE];
						var damage = event[window.worldEventKeys.DAMAGE];

						//console.log("(ability)attacking being: " + castingBeing.refno + " targetBeing: " +
							//targetedBeing.refno);

						// TODO: deal with this
						window.abilityReceiver.onReceiveInstantOffensive(castingBeing, targetedBeing, abilityCode, damage); // todo - flesh this out
					 
					 } else if(eventType == window.worldEventCodes.START_SIMPLE_CASTING) {

					 	var abilityCode = event[window.worldEventKeys.ABILITY_CODE];
					 	var castingBeing = window.world.beings[event[window.worldEventKeys.BEING_REFNO]];
					 	var targetedBeing = window.world.beings[event[window.worldEventKeys.TARGET_REFNO]];

					 	console.log("castingBeing " + castingBeing.refno + " start CASTING");
					 }
				});
			});

			// TODO - change all these to enum codes, big strings cannot be used, they are far too big to send regularly

			socket.on('login error', (data) => {
				console.log("login error: " + data);
			});

			socket.on('registration success', () => {
				console.log("received register success");	

				// display message that registration was successful
				window.onRegistrationSuccess();
			});

			socket.on('registration error', (msg) => {
				console.log("received reg error:" + msg);

				window.onRegistrationError(msg);
			});

			socket.on('entered world', (data) => {
	    		console.log("received entered world");
			});

			socket.on('user update', (data) => {
	    		console.log("received user update");
	    		console.log(data);
			});

			socket.on('testspawnconfirmation', (data) => {
				console.log("RECEIVED TEST SPAWN CONFIRMATION from server");

				window.setSpawnData(data);

				// trigger phaser to load main scene
				window.main.scene.start('MainScene');

				window.changeAppPage("in main");

				window.actionBarManager.init();
			});

			socket.on('worldupdate', data => {
				if(data.posdata) {
					window.main.scene.keys["MainScene"].onNewPos(data.posdata);
				}
				if(data.eventdata) {
					data.eventdata.forEach(event => {
						window.main.scene.keys["MainScene"].onNewEvent(event);
					});
				}
				if(data.healthdata) {
					data.healthdata.forEach(healthChange => {
						window.main.scene.keys["MainScene"].onHealthChange(healthChange.r, healthChange.h);
					});
				}
			});

			//TODO
			/*

			// send to other users the fact that these units have spawned.
			var newUserArr = [char1.export(), char2.export(), char3.export()];

			// send this to other users
			process.socketio.to(this.socketRoomId).emit('newuserspawned', newUserArr);

			*/

			socket.on('newuserspawned', newUserArr => {
				window.main.scene.keys["MainScene"].onNewUserSpawned(newUserArr);
			});
			

	} else {
		console.log("socket not defined");
	}
	}

}

export default SocketHandlers;