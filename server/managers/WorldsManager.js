const World = require('../types/World');

class WorldsManager {
	constructor() {
		this.worlds = {};
		process.worlds = this.worlds; // by worldName

		// setup test world
		this.createWorld('test', 2);
		this.createWorld('default', 100);
	}

	createWorld(worldName, capacity) {
		this.worlds[worldName] = new World({
			worldName : worldName,
			capacity : capacity,
			blueprint : 'DEFAULT',
		})
	}

	destroyWorld(worldName) {
		this.worlds[worldName].shutdownWorld();
		delete this.worlds[worldName];
	}

	update(deltaTime) {
		Object.values(this.worlds).forEach(world => {
			world.update(deltaTime);
		});
	}
} 

module.exports = WorldsManager;

