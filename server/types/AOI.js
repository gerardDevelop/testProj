class AOI {

	// purely a model class, used to store aoi info
	// when one of the beings of a user enters a new AOI
	// the being should check if its user is already registered to the AOI

	// it calls the relevant methods inside each AOI to update its status

	constructor(x, y, x2, y2) {
		this.beings = [];
		this.users = [];
		this.x;
		this.y;
		this.x2;
		this.y2;
	}

	onBeingEnter(being) {

		this.beings[being.beingName] = being;

		// check if its user is in the users list
		if(this.users.hasOwnProperty(being.user.username)) {

		}

		// if it is, there's no need to do anything


		// if it isn't, add the user, and send the beings information of that particular AOI through the user socket
			
	}

	onBeingLeave(being) {
		// remove being from list first

		delete this.beings[being.beingName];	

		if(being.user.hasAnotherBeingInAOI()) {
			// don't remove user from this AOI

		} else {

		}


	}
}

module.exports = AOI;