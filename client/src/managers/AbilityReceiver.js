class AbilityReceiver {
	constructor() {

	}

	onReceiveInstantOffensive(castingBeing, targetedBeing, abilityCode, damage) {
		//console.log("Being " + castingBeing.refno + " used ability(" + abilityCode + ") on " 
						//	+ targetedBeing.refo + " for " + damage + " damage.");	

		// check if attackingBeing is owned by user
		if(window.user.isBeingOwned(castingBeing.refno)) {
			// trigger cooldown

			// todo: get corresponding actionbutton for this being and abilityCode

			Object.values(window.actionRowsByRefno[castingBeing.refno]).forEach(button => {

				if(button.remainingCooldownTime < 2000) {
					button.onTriggerCooldown(2000); 
				}
			});

			window.actionRowsByRefno[castingBeing.refno][abilityCode].onTriggerCooldown(6000);

			//window.user.myCharsByRefno[castingBeing]
		}

		targetedBeing.applyDamage(damage);
	}

	onReceiveInstantHealing(castingBeing, receivingBeing, abilityCode, amount) {
		//console.log("Being " + castingBeing.refno + " healed "  
						//	+ receivingBeing.refno + " with ability(" + abilityCode + ") for " + amount + " hp.");

		targetBeing.applyHealing(amount);
	}

	onReceiveStartCasting() {

	}

	onReceiveCastingInterrupted() {

	}

	onReceiveSuccessfulFinishCasting() {

	}

	onReceiveSpawnProjectile() {

	}

	onReceiveRemoveProjectile() {

	}


}

export default AbilityReceiver;