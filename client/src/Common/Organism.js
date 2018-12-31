//import OrganismKinds from '../Lookups/OrganismKinds';

// holds default properties for all organisms

class Organism {
	constructor() {
		// all defaults
		this.health = 1;
		this.totalHealth = 1;
		this.mana = 1;
		this.x = 0;
		this.y = 0;
		this.facing = 'right';
		this.kind = 'mob';

		this.hasNewPos = false;
		this.newX = null;
		this.newY = null; 
	}

	init(config) {
		this.health = config.health;
		this.totalHealth = config.totalHealth;
		this.mana = config.mana;
		this.totalMana = config.totalMana;
		this.myName = config.myName;
		this.x = config.x;
		this.y = config.y;
		this.facing = config.facing;
		this.kind = config.kind;

		switch(this.kind) {
			case 'myCharacter': {
				this.myCharacterProps = new MyCharacterProps();
				break;
			}
		}	
	}

	onNewPos(newX, newY) {
		this.hasNewPos = true;
		this.newX = newX;
		this.newY = newY;
	}

	update(deltaTime) {
		if(this.kind === 'myCharacter') {
			this.myCharacter.update();
		} else {
			// move towards newX and newY / interpolation

		}

		


	}
}

export default Organism;