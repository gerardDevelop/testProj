class DOT {
	constructor(config) {
		this.thingKind =  ENUMS.THING_KINDS.DOT;
		this.DOTName = config.DOTName;
		this.owner = config.owner;
		this.targeting = config.targeting;

		// number of ticks
		this.numberOfTicksRemaining = config.numberOfTicksRemaining;

		// time per tick
		this.timePerTick = config.timePerTick;

		// timer
		this.tickTimer = this.timePerTick;

		this.DOTfinished = false;
	}

	update(deltaTime) {
		// decrement time in the current tick timer
		this.tickTimer -= deltaTime;

		if(tickTimer <== 0 && !this.DOTfinished) {
			numberOfTicksRemaining -= 1;

			this.tickTimer = this.timePerTick;

			tick();

			if(numberOfTicksRemaining <== 0) {
				// end of DOT.. mark for removal
				this.DOTfinished = true;
			}
		}
	}

	tick() {

	}
}

module.exports = DOT;