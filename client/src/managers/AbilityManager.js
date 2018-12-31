class AbilityManager {
	constructor() {
		window.isWaitingForLocationClick = false;
		window.isWaitingForBeingSelect = false;
		window.waitingAbilityCode = null;
		window.waitingRefno = null;
	}

	triggerAbility(abilityCode, beingRefno) {
		// check if ability targets another being, or a location,
		// then update UI accordingly

		console.log("trigger! code: " + abilityCode);

		switch(window.commonEnums.abilityToInitType[abilityCode]) {
			case 's': {
				
				//if(window.user.hasSelection) {
				
				var castingBeing = window.user.myCharsByRefno[beingRefno];

				if(castingBeing.currentTarget) {
					window.socketSender.sendStandardAbilityRequest(abilityCode, beingRefno, castingBeing.currentTarget.refno);
					console.log("trying to execute ability from " + beingRefno + " against " + castingBeing.currentTarget.refno);
				} else {
					// cannot execute ability
					console.log("cannot execute ability because no target");
				}

				// send standard ability request (selectedBeing and currentTarget)
				
			} break;

			case 'w': {
				window.waitingAbilityCode = abilityCode;
				window.waitingRefno = beingRefno;
				window.isWaitingForBeingSelect = true;
			} break;

			case 'l': {
				window.waitingAbilityCode = abilityCode;
				window.waitingRefno = beingRefno;
				window.isWaitingForLocationClick = true;
			} break;
		}
	}

	onSelectAbilityLocation(x, y) {
		window.socketSender.sendAbilityAtLocationRequest(window.waitingAbilityCode, window.waitingRefno, x, y);
	}

	onSelectAbilityBeingTarget(targetRefno) {
		window.socketSender.sendAbilityWithTargetRequest(window.waitingAbilityCode, window.waitingRefno, targetRefno);
	}

	// casting?
}

export default AbilityManager;