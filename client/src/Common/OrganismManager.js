import Organism from './Organism';

class OrganismManager {
	constructor() {
		this.organisms = {}; // by organismId
		this.organismsToDelete = [];
	}	

	update(deltaTime) {
		Object.values(this.organisms).forEach(organism => {
			organism.update(deltaTime);
		});
	}

	spawnOrganism(data) {
		// x, y, toX, toY, organismId, name, health, totalHealth, etc
	}
}

export default OrganismManager;