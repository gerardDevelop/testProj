const SetupSocketHandlers = (io) => {

	io.sockets.on('connection', (socket) => {
			
		socket.isLoggedIn = false;

		// connect
		console.log("new connection from " + socket.id);

		socket.on('disconnect', (reason) => {
			try {
				console.log("disconnection from " + socket.id);
				
				if(socket.isLoggedIn) {
					socket.user.onDisconnect();
				}	
			} catch(err) {
				console.log("Error during user disconnection: " + err.message);
			}
			// todo:
			// - mark beings as disconnected in world
			// - mark user as disconnected, so if the user reconnects quickly, their current user session can be recovered from memory
		});

		// non world callbacks
		socket.on(process.clientCodes.LOGIN_REQUEST, (reqData) => {
			try {
				console.log("received login request");

				// delegate this task off to the DatabaseClient, sending the connection's socket.id as a reference
				reqData[process.messageKeys.USER_SOCKET_ID] = socket.id;
				process.databaseClient.onLoginRequest(reqData);

			} catch (err) {
				console.log("error during login request, " + err.message);
			}
		});

		socket.on(process.clientCodes.REGISTRATION_REQUEST, (reqData) => {
			try {
				console.log("received registration request");

				// delegate this task off to the DatabaseClient, sending the connection's socket.id as a reference
				reqData[process.messageKeys.USER_SOCKET_ID] = socket.id;
				process.databaseClient.onRegistrationRequest(reqData);

			} catch (err) {
				console.log("error during registration request, " + err.message);
			}
		});

		// matchmake request
		socket.on(process.clientCodes.MATCHMAKE_REQUEST, (reqData) => {
			try {
				console.log("received matchmake request");
			} catch (err) {
				console.log("error during matchmake request, " + err.message);
			}
		});

		// enter world request
		socket.on(process.clientCodes.ENTER_WORLD_REQUEST, (reqData) => {
			try {
				console.log("received enter world request");

				// reqData should contain the name of the world to connect to
				// as well as being names and types

				// example req data: (make sure the key names exist on server and client)

				/*
				
				{
					worldName:
					being1Name:
					being2Name:	
					being1type:
					being2type:
				}

				*/

			} catch (err) {
				console.log("error during enter world request, " + err.message);
			}
		});

		// leave world request		
		socket.on(process.clientCodes.LEAVE_WORLD_REQUEST, (reqData) => {
			try {
				console.log("received leave world request");
			} catch (err) {
				console.log("error during leave world request, " + err.message);
			}
		});

		// for joining a test world
		socket.on(process.clientCodes.TEST_RUN_REQUEST, (reqData) => {
			//try {
				console.log("received test run request");

				if(socket.isLoggedIn) {
					// delegate to worldManager
					//process.worldManager.onTestRunRequest()

					//console.log("sample message: " + process.messageKeys.USERNAME);

					//console.log("char array key: " + process.messageKeys.CHARACTERS_ARRAY);

					var charactersArray = reqData[process.messageKeys.MY_CHARACTERS_ARRAY]; // should be an array directly from client

					// break up data
					//reqData[process.messageKeys.CHARACTERS_ARRAY]

					console.log("array length: " + charactersArray.length);

					process.worlds[reqData[process.messageKeys.WORLD_NAME]].onUserJoin(socket.user, charactersArray);
				}

			//} catch(err) {
				//console.log("error during test run request: " + err.message);
		//	}	
		});

		// in world specific request callbacks

		socket.on(process.clientCodes.MOVE_REQUEST, (reqData) => {
			try {
				// find the world in the socket's user object
				// find the being referenced by the refno in reqData

				var refno = reqData[process.messageKeys.BEING_REF_NO];

				// find the user of this socket
				var user = socket.user;

				// find the user's world
				var world = user.world;

				// find the being referenced by the refno
				var being = world.beings[refno];

				var x = reqData[process.messageKeys.X];

				var y = reqData[process.messageKeys.Y];

				// move it/ begin the moving procedure
				being.onNewMoveRequest(reqData[process.messageKeys.X], reqData[process.messageKeys.Y]);

			} catch (err) {
				console.log("error during move request, " + err.message);
			}
		});

		socket.on(process.clientCodes.TARGET_ENEMY_REQUEST, (reqData) => {
			try {

				console.log("recieved attack being request");
				// find the world in the socket's user object
				// find the being referenced by the refno in reqData

				var refno = reqData[process.messageKeys.BEING_REF_NO];
				var targetRefno = reqData[process.messageKeys.TARGET_REF_NO];

				// find the user of this socket
				var user = socket.user;

				// find the user's world
				var world = user.world;

				var being = world.beings[refno];

				console.log("target being refno: " + targetRefno);

				var targetBeing = world.beings[targetRefno];

				being.onNewTargetBeingRequest(targetBeing);	
				
			} catch (err) {
				console.log("error target enemy request, " + err.message);
			}
		});

		socket.on(process.clientCodes.STOP_ATTACK_REQUEST, (reqData) => {
			try {
				// find the world in the socket's user object
				// find the being referenced by the refno in reqData
			} catch (err) {
				console.log("error during stop attack request, " + err.message);
			}
		});

		socket.on(process.clientCodes.ABILITY_REQUEST, (reqData) => {
			try {
				// find the world in the socket's user object
				// find the being referenced by the refno in reqData
				
				console.log("received ability request");

				//reqData[process.messageKeys.BEING_REF_NO];
				//reqData[process.messageKeys.TARGET_REF_NO];
				var abilityCode = reqData[process.messageKeys.ABILITY_CODE];
				var beingRefno = reqData[process.messageKeys.BEING_REF_NO]
				var targetRefno = reqData[process.messageKeys.TARGET_REF_NO];

				console.log("(ability)attacking being: " + beingRefno+ " targetBeing: " +
							targetRefno);

				var being = socket.user.world.beings[beingRefno];
				var target = socket.user.world.beings[targetRefno];

				being.onSimpleAbilityRequest(abilityCode, target);

				// put this through an ability system / ability manager21

				//target.applyPhysicalDamage(20);

			} catch (err) {
				console.log("error during ability request, " + err.message);
			}
		});

		// new move position request

		// new target request

		// execute ability request

		// 

	});	
}

module.exports = SetupSocketHandlers;