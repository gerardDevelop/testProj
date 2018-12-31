class Character {
	constructor(config) {
		this.scene = config.scene;
		this.refno = config.refno;
        this.sprite = config.sprite;
        this.name = config.name;
        this.kind = config.kind;
        this.username = config.username;
        this.isSelected = config.isSelected;
        this.isDead = false;

        this.health = config.health;
        this.totalHealth = config.totalHealth;

        this.selectGraphics = config.selectGraphics;
        this.selectGraphics.depth = -1;

      	this.selectRect = new Phaser.Geom.Rectangle(0, 0, 
      		this.sprite.width - 4, this.sprite.height - 4);

       	this.selectGraphics.strokeRectShape(this.selectRect);

       	this.selectGraphics.x = this.sprite.x - this.sprite.width / 2 + 2;
        this.selectGraphics.y = this.sprite.y - this.sprite.height / 2 + 1;
        this.selectGraphics.alpha = 0;
        
       	this.healthGraphics = config.healthGraphics;
       	this.healthGraphics.depth = 1000;

       	this.healthLine = new Phaser.Geom.Line(0,0,this.sprite.width,0);
       	this.healthGraphics.strokeLineShape(this.healthLine);

       	this.healthGraphics.x = this.sprite.x - this.sprite.width / 2;
        this.healthGraphics.y = this.sprite.y - this.sprite.height / 2;

        this.oldX = this.sprite.x;
        this.oldY = this.sprite.y;
        this.facingDirection = "down";
        this.stopped = true;

        this.sprite.depth = this.sprite.y;
        this.isMyChar = config.isMyChar;

        this.movementSpeed = 0.075;
        this.isMoving = false;
        this.facing = 'right';

        this.movingDirection = 'none';
        this.isInAttackingAnimation = false;

        this.sprite.on('animationcomplete', () => {
			
			if(this.isInAttackingAnimation) {
				this.isInAttackingAnimation = false;
				console.log("attack animation complete");
			}
		});
	}

	select() {
		this.selectGraphics.alpha = 1;
		this.isSelected = true;
		this.healthGraphics.alpha = 0.9;
	}

	deselect() {
		this.selectGraphics.alpha = 0;
		this.isSelected = false;
		this.healthGraphics.alpha = 0.5;
	}

	onStartMeleeAttack() {

		switch(this.facingDirection) {
			case "up": 
				this.sprite.anims.play(this.kind + 'upattack', true);
				break
			case "left":
				this.sprite.anims.play(this.kind + 'leftattack', true);
				break;
			case "down":
				this.sprite.anims.play(this.kind + 'downattack', true);
				break;
			case "right":
				this.sprite.anims.play(this.kind + 'rightattack', true);
				break;
		}
	}

	// use onPosChange code for character facing mouse direction code

	onMousePosChange(mouseX, mouseY) {
		var xDiff = mouseX - this.sprite.x;
		var yDiff = mouseY - this.sprite.y;

		var angle = Math.atan2(xDiff, yDiff);

		var degrees = 180 * angle / Math.PI;

		var resD = (360 + Math.round(degrees)) % 360;

		// 337.5 - 22.5 	down
		// 22.5 - 67.5 		down right
		// 67.5 - 112.5 	right
		// 112.5 - 157.5    up right
		// 157.5 - 202.5    up 
		// 202.5 - 247.5	up left
		// 247.5 - 292.5    left
		// 292.5 - 337.5	down left

		if(resD > 337.5 || resD < 22.5) {
			// down
			this.facing == 'down'
		} else if(resD > 22.5 && resD < 67.5) {
			// down right
			this.facing == 'down right'
		} else if(resD > 67.5 && resD < 112.5) {
			// right
			this.facing == 'right'
		} else if(resD > 112.5 && resD < 157.5) {
			// up right
			this.facing == 'up right'
		} else if(resD > 157.5 && resD < 202.5) {
			// up
			this.facing == 'up'
		} else if(resD > 247.5 && resD < 247.5) {
			// up left
			this.facing == 'up left'
		} else if(resD > 292.5 && resD < 292.5) {
			// left
			this.facing == 'left'
		} else if(resD > 337.5 && resD < 337.5) {
			// down left
			this.facing == 'down left'
		} 
	}

	onPosChange(x, y) {

		this.stopped = false;
		// determine the direction based on oldX, oldY and newX, newY and animate the movement
		var xChange = x - this.oldX;
		var yChange = y - this.oldY;

		// get angle based on vector
    	var angle = Math.atan2(xChange, yChange);   //radians

	    // you need to devide by PI, and MULTIPLY by 180:
	    var degrees = 180 * angle / Math.PI;  //degrees

	    var resD = (360 + Math.round(degrees)) % 360;

	    // for the illusion of interpolation, use "sprite.setVelocityX(0);"

	    if(resD > 315 || resD < 45) {
	    	this.sprite.anims.play(this.kind + 'down', true);
	    	this.facingDirection = "down";
	    } else if(resD > 45 && resD < 135) {
			this.sprite.anims.play(this.kind + 'right', true);
			this.facingDirection = "right";
	    } else if(resD > 135 && resD < 225) {
	    	this.sprite.anims.play(this.kind + 'up', true);
	    	this.facingDirection = "up";
	    } else if(resD > 225 && resD < 315) {
	    	this.sprite.anims.play(this.kind + 'left', true);
	    	this.facingDirection = "left";
	    }

	    // 45  to 135 = right
	    // 135 to 225 = down
	    // 225 to 315 = left

	    // There needs to be some kind of way of developing this game faster,
	    // But adding animated sprites for the warrior, mage and priest should increase motivation. 

		this.oldX = x;
		this.oldY = y;

		this.sprite.depth = this.sprite.y;
	}

	/*
	onMovementStopped() {	// this isn't really needed anymore

		if(!this.isMyChar) {

			this.stopped = true;

			switch(this.facingDirection) {
				case "down":
					this.sprite.anims.play(this.kind + 'downidle', true);
					break;
				case "right":
					this.sprite.anims.play(this.kind + 'rightidle', true);
					break;
				case "up":
					this.sprite.anims.play(this.kind + 'upidle', true);
					break;
				case "left":
					this.sprite.anims.play(this.kind + 'leftidle', true);
					break;
			}
		}
	}
	*/

	TriggerActionAnimation(name) {
		
		if(this.facing == 'down') {
			this.sprite.anims.play(this.kind + 'downattack', false, 0);
	    } else if(this.facing == 'down right') {
	    	this.sprite.anims.play(this.kind + 'downrightattack', false, 0);
	    } else if(this.facing == 'right') {
	    	this.sprite.anims.play(this.kind + 'rightattack', false, 0);
	    } else if(this.facing == 'up right') {
	    	this.sprite.anims.play(this.kind + 'uprightattack', false, 0);
	    } else if(this.facing == 'up') {
	    	this.sprite.anims.play(this.kind + 'upattack', false, 0);
	    } else if(this.facing == 'up left') {	
	    	this.sprite.anims.play(this.kind + 'upleftattack', false, 0);
	    } else if(this.facing == 'left') {
	    	this.sprite.anims.play(this.kind + 'leftattack', false, 0);
	    } else if(this.facing == 'down left') {
	    	this.sprite.anims.play(this.kind + 'downleftattack', false, 0);
	    }
		
		this.isInAttackingAnimation = true;
	}

	onHealthChange(health) {
		
		if(health > 0) {
			this.health = health;
			// update graphics
			this.healthGraphics.clear();

	       	this.healthLine.x2 = this.sprite.width * (this.health / this.totalHealth);

	        this.healthGraphics.strokeLineShape(this.healthLine);

	        this.healthGraphics.x = this.sprite.x - this.sprite.width / 2;
	        this.healthGraphics.y = this.sprite.y - this.sprite.height / 2;
	    } else {
	    	this.healthGraphics.clear();
	    }
    }

    onDeath() {
    	this.isDead = true;
    }

    update(delta) {
    	if(this.isMoving) {

    		this.healthGraphics.x = this.sprite.x - this.sprite.width / 2;
          	this.healthGraphics.y = this.sprite.y - this.sprite.height / 2;

          	if(!this.isInAttackingAnimation) {

		    	if(this.facing == 'down') {
		    		if(this.isMovingUp) {
		    			this.sprite.anims.playReverse(this.kind + 'down', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'down', true);
			    	}
			    } else if(this.facing == 'down right') {
			    	if(this.isMovingUp && this.isMovingLeft) {
		    			this.sprite.anims.playReverse(this.kind + 'downright', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'downright', true);
			    	}
			    } else if(this.facing == 'right') {
			    	if(this.isMovingLeft) {
		    			this.sprite.anims.playReverse(this.kind + 'right', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'right', true);
			    	}
			    } else if(this.facing == 'up right') {
			    	if(this.isMovingDown && this.isMovingLeft) {
		    			this.sprite.anims.playReverse(this.kind + 'upright', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'upright', true);
			    	}
			    } else if(this.facing == 'up') {
			    	if(this.isMovingDown) {
		    			this.sprite.anims.play(this.kind + 'up', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'up', true);
			    	}
			    } else if(this.facing == 'up left') {	
			    	if(this.isMovingDown && this.isMovingRight) {
		    			this.sprite.anims.playReverse(this.kind + 'upleft', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'upleft', true);
			    	}
			    } else if(this.facing == 'left') {
			    	if(this.isMovingRight) {
		    			this.sprite.anims.playReverse(this.kind + 'left', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'left', true);
			    	}
			    } else if(this.facing == 'down left') {
			    	if(this.isMovingUp && this.isMovingRight) {
		    			this.sprite.anims.playReverse(this.kind + 'downleft', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'downleft', true);
			    	}
			    }
			}	
		}

			else {

				if(!this.isInAttackingAnimation) {

				if(this.facing == 'down') {
		    		if(this.isMovingUp) {
		    			this.sprite.anims.play(this.kind + 'downidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'downidle', true);
			    	}
			    } else if(this.facing == 'down right') {
			    	if(this.isMovingUp && this.isMovingLeft) {
		    			this.sprite.anims.play(this.kind + 'downrightidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'downrightidle', true);
			    	}
			    } else if(this.facing == 'right') {
			    	if(this.isMovingLeft) {
		    			this.sprite.anims.play(this.kind + 'rightidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'rightidle', true);
			    	}
			    } else if(this.facing == 'up right') {
			    	if(this.isMovingDown && this.isMovingLeft) {
		    			this.sprite.anims.play(this.kind + 'uprightidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'uprightidle', true);
			    	}
			    } else if(this.facing == 'up') {
			    	if(this.isMovingDown) {
		    			this.sprite.anims.play(this.kind + 'upidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'upidle', true);
			    	}
			    } else if(this.facing == 'up left') {	
			    	if(this.isMovingDown && this.isMovingRight) {
		    			this.sprite.anims.play(this.kind + 'upleftidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'upleftidle', true);
			    	}
			    } else if(this.facing == 'left') {
			    	if(this.isMovingRight) {
		    			this.sprite.anims.play(this.kind + 'leftidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'leftidle', true);
			    	}
			    } else if(this.facing == 'down left') {
			    	if(this.isMovingUp && this.isMovingRight) {
		    			this.sprite.anims.play(this.kind + 'downleftidle', true);
		    		} else {
			    		this.sprite.anims.play(this.kind + 'downleftidle', true);
			    	}
			    }
			}
		}
    }
}

export default Character;