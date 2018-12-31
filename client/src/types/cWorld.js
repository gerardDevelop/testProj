import cBeing from './cBeing';

class cWorld {
	constructor() {
		//this.worldName = config.worldName;
		//this.blueprint = config.blueprint;

		this.beings = {}; // by refNos
		this.things = {}; // by some kind of thingRefNo

		this.myCharacters = {}; // with numeric keys
	}

	hasBeing(refno) {
		return this.beings.hasOwnProperty(refno);
	}

	addBeing(beingData) {
		const being = new cBeing(beingData);
		this.beings[being.refno] = being;
		//being.beingType = beingData[window.worldEventKeys.BEING_BEINGTYPE];
		being.beingClass = beingData[window.worldEventKeys.BEING_BEINGCLASS];

		return being;
	}

	spawnFromEvent(data) {
		this.addBeing(data);
	}

	addOtherBeing(beingData) {
		console.log("adding other being");
		this.addBeing(beingData);
	}

	addMyCharacters(charArray) {
		
		var incr = 0;
		window.user.myChars = [];
		window.user.myCharsByRefno = {};

		charArray.forEach(beingData => {
			const being = this.addBeing(beingData);
			being.username = window.user.username;
			being.isMyChar = true;

			// add to cUser as well, so ui components/keystrokes etc can access it
			window.user.myChars[incr] = being;
			window.user.myCharsByRefno[being.refno] = being;

			incr++;
		});	
	}

	update(time, delta) {
		Object.values(this.beings).forEach(being => {
			being.update(time, delta);
		});
	}
}

export default cWorld;