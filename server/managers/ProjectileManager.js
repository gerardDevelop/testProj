class ProjectileManager {

	constructor(world) {
		this.world = world;
		this.incr = 1;

		this.projectiles = {}; // can hold different types of projectiles
		this.toDelete = [];
	}

	addProjectile(projectile) {
		projectile.pId = this.incr;
		this.projectiles[this.incr] = projectile;
		this.incr++;

		return projectile.pId;
	}

	update(deltaTime) {
		Object.values(this.projectiles).forEach(projectile => {
			projectile.update(deltaTime);

			if(projectile.projectileHit) {
				this.toDelete.push(projectile.pId);
			}
		});

		if(toDelete.length > 0) {

			this.toDelete.forEach(pId => {
				delete this.projectiles[pId];
			});

			// clear toDelete
			this.toDelete = [];
		}
	}
}

module.exports = ProjectileManager;