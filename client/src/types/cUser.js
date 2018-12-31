
// user model class
class cUser {

	// when logged in, this user object should be made and placed attached to window

	constructor(username) {
		this.username = username;
		this.myChars = null;
		this.myCharsByRefno = null;

		this.hasSelection = false;
		this.selectedChar = null;

		 // for the various different characters to be accessed using ui, keyboard strokes, etc.

		// TODO - session token for quick reconnection
		// this.myBeings
		// session time, etc
		// friends list?
		// friends requests?
		// chat messages / mail
		// points / resources / gold?
		// pvp rating
	}

	isBeingOwned(refno) {
		if(this.myCharsByRefno.hasOwnProperty(refno)) {
			return true;
		} return false;
	}

	onSelectCharacter(int) {

		if(this.hasSelection) {
			this.selectedChar.onDeselect();
		}

		this.selectedChar = this.myChars[int];
		this.hasSelection = true;
		this.selectedChar.onSelect();
		console.log("selected character " + this.selectedChar.refno + ", type: " + this.selectedChar.beingClass);
		// drive this change to the UI
		//window.uiManager.onChangeSelection();
	}
}

export default cUser;