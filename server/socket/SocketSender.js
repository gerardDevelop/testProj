// A place where outgoing socket messages are organised

class SocketSender {
	constructor() {

	}

	// login success
	sendLoginSuccessResponse(socket, username) {
		socket.emit(process.clientCodes.LOGIN_RESPONSE_SUCCESS, username);
		// response object with various different benchmarks, like number of users online for example...
		// not important to place too much in the return object now
	}
	
	// login failure
	sendLoginFailureResponse(socket, reason) {
		socket.emit(process.clientCodes.LOGIN_RESPONSE_FAILURE, reason);
	}

	// register success
	sendRegisterSuccessResponse(socket) {
		socket.emit(process.clientCodes.REGISTER_RESPONSE_SUCCESS);
	}

	// register failure
	sendRegisterFailureResponse(socket, reason) {
		socket.emit(process.clientCodes.REGISTER_RESPONSE_FAILURE);
	}

	// called from world
	sendEnterWorldSuccessResponse(socket, data) {
		socket.emit(process.clientCodes.ENTER_WORLD_SUCCESS_RESPONSE, data);
	}

	sendEnterWorldFailureResponse(socket, reason) {
		socket.emit(process.clientCodes.ENTER_WORLD_FAILURE_RESPONSE, reason);
	}

	SendWorldShutdownMessage(socketRoomId) {
		process.socketio.to(socketRoomId).emit(process.clientCodes.WORLD_SHUTDOWN_MESSAGE);
	}

	// other being spawn events can be send through this
	SendWorldEvents(socketRoomId, eventsArr) {
		process.socketio.to(socketRoomId).emit(process.clientCodes.WORLD_SEND_EVENTS, eventsArr);
		//console.log("send world events sent");
	}
} 

module.exports = SocketSender;