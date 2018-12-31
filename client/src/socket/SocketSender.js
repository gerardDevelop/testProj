class SocketSender {
	constructor(socket) {
		// todo: flesh out this class and use it for all socket emit sending
		this.socket = socket;
	}

	// world specific
	sendMoveRequest(refno, x, y) {

		const data = {};

		data[window.messageKeys.BEING_REF_NO] = refno;
		data[window.messageKeys.X] = x;
		data[window.messageKeys.Y] = y;

		this.socket.emit(window.clientCodes.MOVE_REQUEST, data);
	}

	sendTargetRequest(selectedRefno, targetRefno) {
		const data = {};

		data[window.messageKeys.BEING_REF_NO] = selectedRefno;
		data[window.messageKeys.TARGET_REF_NO] = targetRefno;

		this.socket.emit(window.clientCodes.TARGET_ENEMY_REQUEST, data);
	}

	sendStandardAbilityRequest(abilityCode, selectedRefno, targetRefno) { 		
		const data = {};

		data[window.messageKeys.ABILITY_CODE] = abilityCode;
		data[window.messageKeys.BEING_REF_NO] = selectedRefno;
		data[window.messageKeys.TARGET_REF_NO] = targetRefno;

		console.log("sending standard ability request, selected: " + selectedRefno +
			" target: " + targetRefno);

		this.socket.emit(window.clientCodes.ABILITY_REQUEST, data);
	}

	sendAbilityAtLocationRequest(abilityCode, selectedRefno, x, y) { 	
		const data = {};

		data[window.messageKeys.BEING_REF_NO] = selectedRefno;
		data[window.messageKeys.TARGET_REF_NO] = targetRefno;

		this.socket.emit(window.clientCodes.ABILITY_AT_LOCATION_REQUEST, data);
	}
}

export default SocketSender;