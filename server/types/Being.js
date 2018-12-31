const BeingProjectile = require('./things/BeingProjectile');

class Being {
	constructor(world, beingName, refno, x, y) {

		// access effects with effectID
		this.effects = {};

		// todo CHARACTER CODE LIKE wr mg pr
		// this.characterCode maybe not

		// essential stats 		
 		this.beingType = process.commonEnums.beingTypes.FRIENDLY_NPC; // by default

 		// todo FIX THIS this.beingKind ... is wr,mg,pr etc , NOT type

 		this.isNPC = true;

 		this.world = world;
 		this.beingName = beingName;
 		this.refno = refno;
 		this.x = x;
 		this.y = y;

 		this.isDead = false;

 		this.hp = 100;
 		this.totalhp = 100;
 		this.mp = 100;
 		this.totalmp = 100;

 		this.intent = "idle"; // can be idle, moving, attacking
 		this.state = "idle";

 		// for movement
 		//this.isMoving = false;
 		this.toMoveX = null;
 		this.toMoveY = null;

 		// for broadcasting
 		this.oldX = x;
 		this.oldY = y;

 		// for attacking
 		this.currentTarget = null;

 		this.movementSpeed = 80;

 		this.attackRange = 25;
 		this.castRange = 200;

 		this.attackCooldown = 0;
 		this.attackCooldownLength = 1500;

 		this.globalCooldown = 0;
 		this.globalCooldownLength = process.commonEnums.globalCooldownLength;

 		this.abilityCooldowns = [];

 		this.armorReduction = 0.15; // as a flat cooefficient

 		this.castingCode = null;
 		this.castingTimer = null;

 		// ****** EXTRA ROPERTIES ******

 		// this.user 
 		// this.beingClass
 	}

 	onInitCharacter() {
 		// get attack range
		switch(this.beingClass) {
			case 'wr' : {
				this.attackRange = 25;
			} break; 

			case 'mg' : {
				this.attackRange = 200;
			} break;

			case 'pr' : {
				this.attackRange = 200;
			} break;
		}
 	}

 	getUsername() {
 		if(this.user) {
 			return this.user.username;
 		} return null;
 	}

 	export() { // only for clients entering world
 		var exportObj = {};

		exportObj[process.worldEventKeys.BEING_NAME] = this.beingName;
		exportObj[process.worldEventKeys.BEING_REFNO] = this.refno;
		exportObj[process.worldEventKeys.BEING_BEINGTYPE] = this.beingType;

		if(!this.isNPC) {
			exportObj[process.worldEventKeys.BEING_BEINGCLASS] = this.beingClass;
		}

		exportObj[process.worldEventKeys.BEING_POSITION_X] = this.x;
		exportObj[process.worldEventKeys.BEING_POSITION_Y] = this.y;

		exportObj[process.worldEventKeys.BEING_HEALTH] = this.hp;
		exportObj[process.worldEventKeys.BEING_MANA] = this.mp;

		exportObj[process.worldEventKeys.BEING_USERNAME] = this.getUsername();
		exportObj[process.worldEventKeys.BEING_TOTAL_HEALTH] = this.totalhp;
		exportObj[process.worldEventKeys.BEING_TOTAL_MANA] = this.totalmp;
		// maybe send effects as well (some beings could spawn with permanent passive effects/buffs on them)
		exportObj[process.worldEventKeys.BEING_EFFECTS] = this.exportEffects();

		return exportObj;
 	}

 	exportEffects() {
 		var effectsArr = [];

 		Object.values(this.effects).forEach(effect => {
 			//todo -  push formatted effect to arr
 			/*
 			var effectObj = {};
			effectObj[process.worldEventKeys.EFFECT_ID] = effect.effectId;
			effectObj[process.worldEventKeys.EFFECT_NAME] = effect.effectName;
			effectObj[process.worldEventKeys.EFFECT_TIME_LEFT] = effect.timeLeft;

			effectsArr.push(effectObj);
			*/
 		}); 

 		return effectsArr;
 	}

 	onNewTargetBeingRequest(targetBeing) {
 		if(!targetBeing.isDead) {
 			this.currentTarget = targetBeing;
 			this.intent = "attacking"; 
 		}
 	}

 	onNewMoveRequest(moveX, moveY) {

 		this.toMoveX = moveX;
 		this.toMoveY = moveY;

 		this.intent = "moving to point";
 	}

 	inRangeToTarget(attackRange) {

 		//console.log("current target position: " + this.currentTarget.x + ", " + this.currentTarget.y);
 		//console.log("this being position: " + this.x + ", " + this.y);

 		var dist = Math.sqrt(Math.pow(this.currentTarget.x - this.x, 2) + 
 			Math.pow(this.currentTarget.y - this.y, 2));	

 		//console.log("distance: " + dist);

 		if(dist <= attackRange) {
 			return true;
 		} else {
 			return false;
 		}
 	}

 	update(deltaTime) {

 		// cooldowns
 		this.attackCooldown -= deltaTime;
 		this.globalCooldown -= deltaTime;
 		this.abilityCooldowns.forEach(cooldown => {
 			cooldown -= deltaTime;
 		});

 		// program flow

 		// being can be...

 		// idle
 		// idle but attacking
 		// moving to attack
 		// moving to a location

 		// current state can be changed based on current intention and the outside conditions of the world
 		// such as currentTarget distance and 

 		// check current conditions here and alter state if needed
 		switch(this.intent) {
 			case "idle": {

 				this.state = "idle";
 			}
 				
 			break;
 			
 			case "casting": {

 				this.state = "casting";
 			}
 			break;

 			case "attacking":  {

			 	if(!this.currentTarget.isDead) { 
				// check distance
				if(this.inRangeToTarget(this.attackRange)) {
					this.state = "idle and attacking";
				} else {
					this.state = "moving to attack";
				}
			} 
				else {
					this.intent = "idle";
					this.state = "idle";
				}
			}

			break;

 			case "moving to point": {
				// check if being has arrived at destination point yet, or in very close proximity
 				// (i.e. check if walking one towards the destination for one frame would causes the being to overshoot its targer)
 				// this could be done in the movement resolution step later on
 				this.state = "moving to point";
 				//console.log("setting moving to point state from intent");	
 			}

 			break;
 		}

 		switch(this.state) {
 			case "idle": {
 					this.idleUpdate(deltaTime);
 				}
 				break;
 			case "casting": {
 					this.idleCastingUpdate(deltaTime);
 				} 
 				break;

 			case "idle and attacking": {
 					this.idleAttackUpdate(deltaTime);
 				}
 				break;
 			case "moving to point": {
 					//this.movingToPointUpdate(deltaTime);
 					this.moveToPointUpdate(deltaTime, this.toMoveX, this.toMoveY);
 				}
 				break;
 			case "moving to attack": {
 					this.movingToAttackUpdate(deltaTime);
 				}
 				break;
 		}
 	}

 	hasNewPosition() {
 		if(this.oldX !== this.x || this.oldY !== this.y) {
 			return true;
 		} return false;
 	}

 	idleUpdate(deltaTime) {
 		// nothing
 	}

 	idleCastingUpdate(deltaTime) {

 		this.castingTimer -= deltaTime;

 		if(this.castingTimer < 0) {
 			
 			// casting finished
 			console.log("casting finished");

 			// revert to the previous state, attacking if attacking, idle if idle
 			// (todo) left click to passively target, right click to attack target
 			this.intent = "attacking"; // attacking for now

 		}

 		//this.castingCode = null;
 		//this.castingTimer = null;
 	}

 	applyMagicDamage(damage) {
 		var final = Math.round(damage - (damage * this.armorReduction));
 		this.hp -= final;
 		if(this.hp <= 0) {
 			this.hp = 0;
 			this.onDeath();
 		}
 		
 		return final;
 	}

 	applyPhysicalDamage(damage) {
 		// return damage after armor and other effects have been taken into account
 		var final = Math.round(damage - (damage * this.armorReduction));
 		this.hp -= final;
 		if(this.hp <= 0) {
 			this.hp = 0;
 			this.onDeath();
 		}
 		
 		return final;
 	}

 	onDeath() {
 		console.log("Being " + this.refno + " died");
 		this.isDead = true;
 	}

 	idleAttackUpdate(deltaTime) {
 		//console.log("idle attacking");

 		// todo: delegate this to another class, maybe like 'abilityMotor?'

 		switch(process.commonEnums.characterAttackType[this.beingClass]) {
 			
 			case 'rangedMagic' : {
 				// spawn magic projectile
 				// deal with attack cooldown
		 		if(this.attackCooldown < 0) {
		 			this.attackCooldown = this.attackCooldownLength;

		 			console.log("on ranged attack");

		 			const projectileType = process.commonEnums.projectileTypes.STONE;

		 			// create ranged projectile
		 			var projectile = new BeingProjectile(this, this.currentTarget, projectileType);

					// add this projectile to the projectileManager of this being's world
					var id = this.world.projectileManager.addProjectile(projectile);

		 			// create event about this projectile spawning
		 			this.world.wEventManager.createFireProjectileEvent(this, this.currentTarget, 'a', id);
		 		}
 			} break;

	 		// short range attack

	 		case 'melee' : {

		 		// deal with attack cooldown
		 		if(this.attackCooldown < 0) {
		 			this.attackCooldown = this.attackCooldownLength;

		 			// calculate and apply damage
		 			var initDamage = Math.random() * 3 + 3;

		 			var finalDamage = this.currentTarget.applyPhysicalDamage(initDamage);

		 			// send msg to clients about attack as an event
		 			this.world.wEventManager.createAttackEvent(this, this.currentTarget, finalDamage);
		 		}
	 		} break;
 		}
 	}

 	moveToPointUpdate(deltaTime, toMoveX, toMoveY) {

		// find vertical and horizontal lengths from current pos to destination pos
		const xComponent = toMoveX - this.x;	
		const yComponent = toMoveY - this.y;	

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

			if(!isNaN(toMoveX) && !isNaN(toMoveY)) {
				this.x = toMoveX;
				this.y = toMoveY;
				this.onStopMoving();
			}
		} else {

			if(!isNaN(xMovement) && !isNaN(yMovement)) {
				// apply x, y components of movement
				this.x = this.x + xMovement;
				this.y = this.y + yMovement;
			}
		}
	}

	onCastingInterrupted() {
		
	}

	onStartMovement() {
		// interrupt casting if casting
		if(this.isCasting) {
			onCastingInterrupted();
		}
	}

	onStopMoving() {
		// check intent; if moving to point, switch to idle
		// if attacking, initate attack

		if(this.intent === "moving to point") {
			this.intent = "idle";
		} else if(this.intent === "attacking") {
			// nothing for now, intent switch statement should prevent this from occurring
		}		
	}

 	movingToAttackUpdate(deltaTime) {
 		//console.log("moving to attack!");

 		// move to currentTarget's positionX and positionY
 		this.moveToPointUpdate(deltaTime, this.currentTarget.x, this.currentTarget.y);
 	}

 	movingToCastUpdate(delta) {

 	}

 	disabledUpdate(deltaTime) {

 	}

 	onSimpleAbilityRequest(abilityCode, abilityTarget) {
 		// run the abilityCode through checks

 		// lookup is simple ability

 		// lookup simple ability type (instant, spawns projectile, casting?)
 			// depending on this, the program flows in the relevant direction

 		var execType = process.commonEnums.abilityToExecutionType[abilityCode];

 		switch(execType) {
 			case 'i': {
 				console.log("executing instant ability");

 				// check range 
 				if(this.globalCooldown < 0 &&
 					this.inRangeToTarget(this.attackRange + 10)) {

 					// for now simple damage
 					var finalDamage = abilityTarget.applyPhysicalDamage(Math.random() * 5 + 20);

 					// todo: trigger cooldown
 					this.globalCooldown = this.globalCooldownLength;

 					// create broadcast event
 					this.world.wEventManager.createAbilityExecutionEvent(this, abilityTarget, abilityCode, finalDamage);
 				} else {
 					// send failure message to the being's user

 					// todo: queue it up for execution in the future
 				}
 			} break;

 			case 'c': {
 				console.log("starting casting ability");

 				if(this.globalCooldown < 0 &&
 					this.inRangeToTarget(this.castRange)) {

	 				this.intent = 'casting';
	 				this.castingCode = abilityCode;
	 				this.castingTimer = 2000;
	 				this.globalCooldown = this.globalCooldownLength;

	 				// stop movement
	 				this.world.wEventManager.createSimpleStartCastingEvent(this, abilityTarget, abilityCode, finalDamage);
 					
 				}

 			} break;

 			default: {
 				// nothing for now

 			} break;
 		}
 	}

 	/*

 	// for exporting this being as a data object to clients
 	export() {
 		var data = {};

 		// message keys should be encapsulated in the socket emit class
 		// so all the preceding information should be sent as references to the socket emit class

 		data[ENUMS.MSG_KEYS.BEING_NAME] = this.beingName;
 		data[ENUMS.MSG_KEYS.BEING_REF_NO] = this.refno;
 		data[ENUMS.MSG_KEYS.BEING_POSITION_X] = this.x;
 		data[ENUMS.MSG_KEYS.BEING_POSITION_Y] = this.y;
		data[ENUMS.MSG_KEYS.BEING_HEALTH] = this.hp;
		data[ENUMS.MSG_KEYS.BEING_MANA] = this.mp;
		data[ENUMS.MSG_KEYS.BEING_KIND] = this.beingType;
		data[ENUMS.MSG_KEYS.BEING_USERNAME] = this.user.username;
		data[ENUMS.MSG_KEYS.BEING_TOTAL_HEALTH] = this.totalhp;
		data[ENUMS.MSG_KEYS.BEING_TOTAL_MANA] = this.totalmp;

		// other data may need to be added here later, such as all current buffs/things	

 		return data;
 	}

 	*/
}

module.exports = Being;