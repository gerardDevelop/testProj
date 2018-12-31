// things are non-organism entities such as projectiles, buffs, etc

class ThingManager {
	constructor() {
		this.things = {};
		this.thingsToDelete = [];
	}

	update(deltaTime) {
		Object.values(this.things).forEach(thing => {
			thing.update(deltaTime);
		});
	}
}

export default ThingManager;