const ENUMS = process.ENUMS;

class Debuff {
	constructor(config) {
		this.thingKind =  ENUMS.THING_KINDS.Debuff;
		this.debuffName = config.debuffName;
		this.owner = config.owner;
		this.targeting = config.targeting;
	}

	update(deltaTime) {
		// update timer
	}
}

module.exports = Debuff;