class HoverManager {
	constructor() {
		this.currentHoverTarget = null;
		this.hasHoverTarget = false;
	}
	
	onMouseMove(mouseX, mouseY) {
		if(window.inGame) {

			const x = window.main.cameras.main.scrollX + mouseX;
			const y = window.main.cameras.main.scrollY + mouseY;

			// todo: check if a being is selected
			if(window.user.hasSelection) {

				var hasEnemy = false;

				Object.values(window.world.beings).forEach(being => {
					
					if(x > being.positionX - being.sprite.width / 2 && x < being.positionX + being.sprite.width / 2 && 
						y > being.sprite.y - being.sprite.height / 2 && y < being.sprite.y + being.sprite.height / 2) {

						hasEnemy = true;
						this.currentHoverTarget = being;
						this.hasHoverTarget = true;
					}
					// this.sprite.x - this.sprite.width;
		        	// this.sprite.y - this.sprite.height;
				});

				if(hasEnemy) {
					window.setSwordCursor();
					//console.log("setting sword cursor");
				} else {
					window.setHandCursor();
					this.hasHoverTarget = false;
					this.currentHoverTarget = null;
				}	
			}
		}
	}
}

export default HoverManager;