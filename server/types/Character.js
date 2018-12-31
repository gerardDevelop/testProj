class Character {
	constructor(being, user) {
		this.being = being;
		this.user = user;
	}

	update(deltaTime) {
		this.being.update(deltaTime);
	}
}

module.exports = Character;