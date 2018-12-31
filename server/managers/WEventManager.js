'use strict'

const WEvent = require('../types/WEvent');

// exists inside world object

class WEventManager {
	constructor(world) {
		this.world = world;
		this.events = [];
		this.sendTime = 0;
		this.sendThreshold = 100; // ms
		this.eventIncr = 0;
	}	

	update(deltaTime) {
		// increment send time until it passes a certain threshold,
		// then send events

		this.sendTime += deltaTime;

		//console.log("deltaTime: " + deltaTime);

		if(this.sendTime > this.sendThreshold) {

			this.sendTime = 0;

			this.checkForNewPositionEvents();

			if(this.events.length > 0) {

				//this.sendTime = 0;

				// send off the array of events as an emit
				//console.log("sending world events to " + this.world.socketRoomId);

				process.socketSender.SendWorldEvents(this.world.socketRoomId, this.events);

				this.events = [];
			}
		}
	}

	addEvent(eventObj) {
		this.events.push(eventObj);

		//console.log("adding new event in eventManager");
	}

	createGenericEvent() {
		//var eventObj = new WEvent();
		//this.eventIncr++;
		return {}; //eventObj;
	}

	// todo: create a series of different functions for constructing different types of eventObjs

	getBeingUsername(being) {
		if(being.username) {
 			return being.username;
 		} return null;
	}

	createAttackEvent(attackingBeing, targetedBeing, damage) {
		var eventObj = this.createGenericEvent();

		eventObj[process.worldEventKeys.EVENT_TYPE] = process.worldEventCodes.ATTACK;

		eventObj[process.worldEventKeys.BEING_REFNO] = attackingBeing.refno;

		eventObj[process.worldEventKeys.TARGET_REFNO] = targetedBeing.refno;

		eventObj[process.worldEventKeys.DAMAGE] = damage;

		this.addEvent(eventObj);
 	}

 	createAbilityExecutionEvent(attackingBeing, targetedBeing, abilityCode, damage) {
 		var eventObj = this.createGenericEvent();

		eventObj[process.worldEventKeys.EVENT_TYPE] = process.worldEventCodes.INSTANT_OFFENSIVE_ABILITY_EXECUTION;

		eventObj[process.worldEventKeys.ABILITY_CODE] = abilityCode;

		eventObj[process.worldEventKeys.BEING_REFNO] = attackingBeing.refno;

		eventObj[process.worldEventKeys.TARGET_REFNO] = targetedBeing.refno;

		eventObj[process.worldEventKeys.DAMAGE] = damage;

		//console.log("creating execution event: atkBeing: " + attackingBeing.refno + 
			//" targetedBeing: " + targetedBeing.refno);

		this.addEvent(eventObj);
 	}

 	createSimpleStartCastingEvent(castingBeing, targetBeing, abilityCode) {
 		var eventObj = this.createGenericEvent();

 		eventObj[process.worldEventKeys.EVENT_TYPE] = process.worldEventCodes.START_SIMPLE_CASTING;

 		eventObj[process.worldEventKeys.ABILITY_CODE] = abilityCode;

 		eventObj[process.worldEventKeys.BEING_REFNO] = castingBeing.refno;

 		eventObj[process.worldEventKeys.TARGET_REFNO] = targetBeing.refno;

 		this.addEvent(eventObj);
 	}
 	
	// spawn event
	createSpawnEvent(being) {
		// create an object from all the client-needed properties of the being

		var eventObj = this.createGenericEvent();
		eventObj[process.worldEventKeys.EVENT_TYPE] = process.worldEventCodes.BEING_SPAWN;

		eventObj[process.worldEventKeys.BEING_NAME] = being.beingName;
		eventObj[process.worldEventKeys.BEING_REFNO] = being.refno;
		eventObj[process.worldEventKeys.BEING_POSITION_X] = being.x;
		eventObj[process.worldEventKeys.BEING_POSITION_Y] = being.y;
		eventObj[process.worldEventKeys.BEING_HEALTH] = being.hp;
		eventObj[process.worldEventKeys.BEING_MANA] = being.mp;
		eventObj[process.worldEventKeys.BEING_BEINGTYPE] = being.beingType;
		eventObj[process.worldEventKeys.BEING_TOTAL_HEALTH] = being.totalhp;
		eventObj[process.worldEventKeys.BEING_TOTAL_MANA] = being.totalmp;
		eventObj[process.worldEventKeys.BEING_USERNAME] = being.getUsername();

		// maybe send effects as well (some beings could spawn with permanent passive effects/buffs on them)
		eventObj[process.worldEventKeys.BEING_EFFECTS] = being.exportEffects();

		this.addEvent(eventObj);
	}

	checkForNewPositionEvents() {
		// iterate through all beings in the world
		// check if their current position is different to their old broadcasted position

		Object.values(this.world.beings).forEach(being => {
			if(being.hasNewPosition()) {
				// create new event here
				being.oldX = being.x;
				being.oldY = being.y;

				var eventObj = this.createGenericEvent();

				eventObj[process.worldEventKeys.EVENT_TYPE] = process.worldEventCodes.BEING_CHANGE_POSITION;

				eventObj[process.worldEventKeys.BEING_REFNO] = being.refno;
				eventObj[process.worldEventKeys.BEING_POSITION_X] = being.x;
				eventObj[process.worldEventKeys.BEING_POSITION_Y] = being.y;

				this.addEvent(eventObj);
			} 
		});
	}

	createFireProjectileEvent(castingBeing, targetBeing, projectileTypeCode) {
		var eventObj = this.createGenericEvent();

		eventObj[process.worldEventKeys.EVENT_TYPE] = process.worldEventCodes.FIRE_PROJECTILE;

		eventObj[process.worldEventKeys.PROJECTILE_TYPE_CODE] = projectileTypeCode;

 		eventObj[process.worldEventKeys.BEING_REFNO] = castingBeing.refno;

 		eventObj[process.worldEventKeys.TARGET_REFNO] = targetBeing.refno;

 		this.addEvent(eventObj);
	}
}

module.exports = WEventManager;