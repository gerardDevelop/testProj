class BeingProjectile {
	constructor(ownerBeing, targetBeing, projectileType) {
		this.pId = null; // set externally by projectileManager

		this.x = ownerBeing.x;
		this.y = ownerBeing.y;

		this.ownerBeing = ownerBeing;
		this.targetBeing = targetBeing;

		this.movementSpeed = process.commonEnums.projectileSpeed[projectileType];

		this.projectileHit = false;
	}

	update(deltaTime) {

		if(!this.projectileHit) {
			const toMoveX = targetBeing.x;
			const toMoveY = targetBeing.y;

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
	}

	onStopMoving() {
		console.log("projectile HIT");

		this.projectileHit = true;
	}
}

module.exports = BeingProjectile;