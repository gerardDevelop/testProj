
class cBeing {
	constructor(beingData) {
		// name 
		// refno

		// being type

		// username if user controlled
		
		// hp
		// mp
		// total hp
		// total mp

		// positionX
		// positionY

		// moveToX
		// moveToY

		// isMybeingData - (no need to instantiate it here, because it will be created in cWorld)

		/*

		// maybe send effects as well (some beings could spawn with permanent passive effects/buffs on them)
		eventObj[process.worldEventKeys.BEING_EFFECTS] = being.exportEffects();

		*/

		this.name = beingData[window.worldEventKeys.BEING_NAME];
		this.refno = beingData[window.worldEventKeys.BEING_REFNO];

		this.beingType = beingData[window.worldEventKeys.BEING_BEINGTYPE];
		this.beingClass = beingData[window.worldEventKeys.BEING_BEINGCLASS];

		this.positionX = beingData[window.worldEventKeys.BEING_POSITION_X]; 
		this.positionY = beingData[window.worldEventKeys.BEING_POSITION_Y];

		this.currentTarget = null;

		this.movementSpeed = 80;

		this.newX = this.positionX;
		this.newY = this.positionY;

		this.hp = beingData[window.worldEventKeys.BEING_HEALTH]; 
		this.mp = beingData[window.worldEventKeys.BEING_MANA]; 

		if(beingData[window.worldEventKeys.BEING_USERNAME]) {
			this.username = beingData[window.worldEventKeys.BEING_USERNAME];
		}

		this.totalHp = beingData[window.worldEventKeys.BEING_TOTAL_HEALTH]; 
		this.totalMp = beingData[window.worldEventKeys.BEING_TOTAL_MANA];

		// create sprite and attach to the main scene (I assume that's what needs to be done)
		this.sprite = window.main.add.sprite(this.positionX, this.positionY, "nuclear1"); // sprite hardcoded for now

		this.sprite.depth = this.sprite.y;

		// box graphics
        this.boxGraphics = window.main.add.graphics({
        	lineStyle: { width: 1, color: 0xffffff, alpha: 0.3 }});

        this.boxGraphics.depth = -1;

      	this.boxRect = new Phaser.Geom.Rectangle(0, 0, 
      	this.sprite.width, this.sprite.height);

       	this.boxGraphics.strokeRectShape(this.boxRect);

       	this.boxGraphics.x = this.sprite.x - this.sprite.width / 2;
        this.boxGraphics.y = this.sprite.y - this.sprite.height / 2;
        this.boxGraphics.alpha = 0;

        this.healthGraphics = window.main.add.graphics({
        	lineStyle: { width: 4, color: 0x23f720 }}),

       	this.healthGraphics.depth = 1000;

       	this.healthLine = new Phaser.Geom.Line(0,0,this.sprite.width,0);
       	this.resetHealthBar();

       //	this.healthGraphics.strokeLineShape(this.healthLine);

       //	this.healthGraphics.x = this.sprite.x - this.sprite.width / 2;
        //this.healthGraphics.y = this.sprite.y - this.sprite.height / 2;

		// maybe send effects as well (some beings could spawn with permanent passive effects/buffs on them)
		//console.log("effects: " + beingData[window.worldEventKeys.BEING_EFFECTS]);

		console.log("instantiated new being, beingType: " + this.beingClass + " refno: " + this.refno + " x: " + this.positionX + " y: " + this.positionY);
	}

	onReceiveNewPosition(newX, newY) {
		this.newX = newX;
		this.newY = newY;

		// interpolate position from current to new position
	}

	onInterpMovement(deltaTime) {

		// find vertical and horizontal lengths from current pos to destination pos
		const xComponent = this.newX - this.positionX;	
		const yComponent = this.newY - this.positionY;	

		// find hypotenuse
		const hyp = Math.sqrt(Math.pow(xComponent, 2) + Math.pow(yComponent, 2));

		// find ratio of x and y to hypotenuse separately
		const xRatio = xComponent / hyp;
		const yRatio = yComponent / hyp;

		// break down moveSpeed into x, y components (based on ratio of x/y)
		var xMovement = xRatio * this.movementSpeed; //* deltaTime;
		var yMovement = yRatio * this.movementSpeed; //* deltaTime;

		xMovement *= deltaTime;
		yMovement *= deltaTime;

		xMovement /= 1000;
		yMovement /= 1000;

		var hypMove = Math.sqrt(Math.pow(xMovement, 2) + Math.pow(yMovement, 2));

		// check if in close proximity
		if(hypMove >= hyp) {

			if(!isNaN(this.newX) && !isNaN(this.newY)) {
				this.positionX = this.newX;
				this.positionY = this.newY;
				//this.onStopMoving();
			}
		} else {

			if(!isNaN(xMovement) && !isNaN(yMovement)) {
				// apply x, y components of movement
				this.positionX = this.positionX + xMovement;
				this.positionY = this.positionY + yMovement;
			}
		}

		this.resetSpritePosition();
	}

	applyDamage(damage) {
		this.hp -= damage;
		if(this.hp < 0) {
			this.hp = 0;
		}

		this.resetHealthBar();
	}

	applyHealing(amount) {
		this.hp += amount;

		this.resetHealthBar();
	}

	resetHealthBar() {

		// update graphics
		this.healthGraphics.clear();

       	this.healthLine.x2 = this.sprite.width * (this.hp / this.totalHp);

        this.healthGraphics.strokeLineShape(this.healthLine);

        this.healthGraphics.x = this.sprite.x - this.sprite.width / 2;
        this.healthGraphics.y = this.sprite.y - this.sprite.height / 2;
	}

	onSelect() {
		this.boxGraphics.alpha = 1;	
		console.log("selected!");
	}

	onDeselect() {
		this.boxGraphics.alpha = 0;
		console.log("deselected!");
	}

	resetSpritePosition() {
		this.sprite.x = this.positionX;
		this.sprite.y = this.positionY;

		this.boxGraphics.x = this.sprite.x - this.sprite.width / 2;
		this.boxGraphics.y = this.sprite.y - this.sprite.height / 2;

		this.healthGraphics.x = this.sprite.x - this.sprite.width / 2;
        this.healthGraphics.y = this.sprite.y - this.sprite.height / 2;

        this.sprite.depth = this.sprite.y;
	}

	update(time, delta) {

		

		if(this.positionX !== this.newX || this.positionY !== this.newY) {

			if(this.newX < this.positionX) {
				this.sprite.flipX = true;
			} else {
				this.sprite.flipX = false;
			}

			this.onInterpMovement(delta);
			this.sprite.anims.play('nuclear1run', true);
		} else {
			// stop animation
			this.sprite.anims.play('nuclear1idle', true);

		}

		// play idle for now
		

		// todo: start run animation on move

		// interpolate movement

		// sprite flipping
	}
}

export default cBeing;