
import Character from '../Common/Character';
import Enums from '../Common/Enums';
import SetupCharacterAnimations from '../Common/SetupCharacterAnimations';
import cWorld from '../types/cWorld';

class OldMainScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainScene'
        });

        this.characters = {};
        this.ownedCharacters = [];
        this.isDraggingBox = false;
        this.leftMouseIsDown = false;
        this.dragBoxOriginX = 0;
        this.dragBoxOriginY = 0;

        this.allSprites = {};
        this.xCamMove = 0;
        this.yCamMove = 0;
        this.myChar = null;

        this.mouseWorldX = 0;
        this.mouseWorldY = 0;

        this.backgroundColor = '#4d4d4d';

        this.projectiles = {};

        this.world = null;

        window.mainScene = this;
    }

    startNewWorld() {
      this.world = new cWorld();
    }

    // todo: clean this all up

    preload() {
      /*
        this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
        */
    }

    resize(width, height) {
        if (width === undefined) { width = this.sys.game.config.width; }
        if (height === undefined) { height = this.sys.game.config.height; }

        this.cameras.resize(width, height);

        //this.cameras.main.setViewport(0, 0, width, height);
    }

    onMoveMainChar(delta) {

      if(this.myChar) {
      // find mouse position, find its relationship to main character (north, east, south, west), and 

      //char.onMainMove(data[refno].x, data[refno].y);

        var xMove = 0;

        var yMove = 0;

        if(this.myChar.isMovingUp) {
          yMove -= delta * this.myChar.movementSpeed;
        } if(this.myChar.isMovingDown) {
          yMove += delta * this.myChar.movementSpeed;
        } if(this.myChar.isMovingRight) {
          xMove += delta * this.myChar.movementSpeed;
        } if(this.myChar.isMovingLeft) {
          xMove -= delta * this.myChar.movementSpeed;
        }

        if(xMove !== 0) {
          this.myChar.sprite.x += xMove;
          
        } if(yMove !== 0) {
          this.myChar.sprite.y += yMove;
        }
        
        //this.myChar.isMoving = true;

        // find distance from 
        //mouseWorldY and mouseWorldX to myChar

        var yDiff = this.mouseWorldY - this.myChar.sprite.y;
        var xDiff = this.mouseWorldX - this.myChar.sprite.x;

       // var xDiff = mouseX - this.sprite.x;
       // var yDiff = mouseY - this.sprite.y;

        var angle = Math.atan2(xDiff, yDiff);

        var degrees = 180 * angle / Math.PI;

        var resD = (360 + Math.round(degrees)) % 360;

        //console.log("resD: " + resD);

        // 337.5 - 22.5   down
        // 22.5 - 67.5    down right
        // 67.5 - 112.5   right
        // 112.5 - 157.5    up right
        // 157.5 - 202.5    up 
        // 202.5 - 247.5  up left
        // 247.5 - 292.5    left
        // 292.5 - 337.5  down left

        if(resD > 337.5 || resD < 22.5) {
          // down
          this.myChar.facing = 'down'
        } else if(resD > 22.5 && resD < 67.5) {
          // down right
          this.myChar.facing = 'down right'
        } else if(resD > 67.5 && resD < 112.5) {
          // right
          this.myChar.facing = 'right'
        } else if(resD > 112.5 && resD < 157.5) {
          // up right
          this.myChar.facing = 'up right'
        } else if(resD > 157.5 && resD < 202.5) {
          // up
          this.myChar.facing = 'up'
        } else if(resD > 202.5 && resD < 247.5) {
          // up left
          this.myChar.facing = 'up left'
        } else if(resD > 247.5 && resD < 292.5) {
          // left
          this.myChar.facing = 'left'
        } else if(resD > 292.5 && resD < 337.5) {
          // down left
          this.myChar.facing = 'down left'
        } 

        /*
        if(yDiff < 0) {
          if(xDiff < 0) {
            if(yDiff < xDiff) {
              // facing up
              this.myChar.facing = 'up';
              //this.myChar.sprite.anims.play(this.myChar.type + 'upidle', true);
            } else {
              // facing left
              this.myChar.facing = 'left';
              //this.myChar.sprite.anims.play(this.myChar.type + 'leftidle', true);
            }
          } else {
            xDiff *= -1;

            if(yDiff < xDiff) {
              // facing up
              this.myChar.facing = 'up';
              //this.myChar.sprite.anims.play(this.myChar.type + 'upidle', true);
            } else {
              // facing right
              this.myChar.facing = 'right';
              //this.myChar.sprite.anims.play(this.myChar.type + 'rightidle', true);
            }
          }
        } else {
          if(xDiff < 0) {
            xDiff *= -1;

            if(yDiff > xDiff) {
              // facing down
              this.myChar.facing = 'down';
              //this.myChar.sprite.anims.play(this.myChar.type + 'downidle', true);
            } else {
              // left
              this.myChar.facing = 'left';
              //this.myChar.sprite.anims.play(this.myChar.type + 'leftidle', true);
            }
          } else {
            if(yDiff > xDiff) {
              // facing down
              this.myChar.facing = 'down';
              //this.myChar.sprite.anims.play(this.myChar.type + 'downidle', true);
            } else {
              // right
              this.myChar.facing = 'right';
              //this.myChar.sprite.anims.play(this.myChar.type + 'rightidle', true);
            }
          }
        }
        */
      }

        /*
        if(char) {
          this.myChar.sprite.x = data[refno].x;
          this.myChar.sprite.y = data[refno].y;
          this.myChar.selectGraphics.x = char.sprite.x - char.sprite.width / 2 + 2;
          this.myChar.selectGraphics.y = char.sprite.y - char.sprite.height / 2 + 1;
          this.myChar.healthGraphics.x = char.sprite.x - char.sprite.width / 2;
          this.myChar.healthGraphics.y = char.sprite.y - char.sprite.height / 2;
        }
        */
    }

    onButtonDown(button) {
      switch(button) {
        case 'up' : 
          // start moving
          // prematurely move character so the user has a satisfying feel of movement
          // every so often, send server an update of new position

          if(this.myChar) {
            this.myChar.isMovingUp = true;
            this.myChar.isMoving = true;
          }

          break;
        case 'down' : 

          if(this.myChar) {
            this.myChar.isMovingDown = true;
            this.myChar.isMoving = true;
          }

          break;
        case 'right' : 

          if(this.myChar) {
            this.myChar.isMovingRight = true;
            this.myChar.isMoving = true;
          }

          break;
        case 'left' : 

          if(this.myChar) {
            this.myChar.isMovingLeft = true;
            this.myChar.isMoving = true;
          }

          break;
      }
    }

    onButtonUp(button) {

      if(this.myChar) {

        switch(button) {
          case 'up' : 
            // start moving
            // prematurely move character so the user has a satisfying feel of movement
            // every so often, send server an update of new position
            this.myChar.isMovingUp = false;
            break;
          case 'down' : 
            this.myChar.isMovingDown = false;
            break;
          case 'right' : 
            this.myChar.isMovingRight = false;
            break;
          case 'left' : 
            this.myChar.isMovingLeft = false;
            break;

            /*
          case 'action1':

            // trigger animatkion only after the server has responded.

            // so.. todo

            // send a simple message to server

            // let the server handle execution or rejection of the ability

            // if execution is successful, then play the animation and render
            // associated projectiles / particle effects / damage numbers, 
            // color flashes, animations of other character(s) being affected. 


            this.myChar.TriggerActionAnimation('attack');


            //console.log("triggered action1");
            break;
            */
          }


      }

      if(!this.myChar.isMovingUp && !this.myChar.isMovingDown && !this.myChar.isMovingRight && !this.myChar.isMovingLeft) {
        this.myChar.isMoving = false;

      } else {
        this.myChar.isMoving = true;
      }
    }

    onMouseMove(mouseX, mouseY) {

      var worldX = this.cameras.main.scrollX + mouseX;
      var worldY = this.cameras.main.scrollY + mouseY;  

      window.mouseWorldX = worldX;
      window.mouseWorldY = worldY;

      this.mouseWorldX = worldX;
      this.mouseWorldY = worldY;

      /*
      if(this.dragGraphics) {

        if(this.leftMouseIsDown && !this.isDraggingBox) {
          if(worldX - this.dragRect.x > 5 || 
            worldY - this.dragRect.y > 5) {
            this.isDraggingBox = true;
          }
        }

        if(this.isDraggingBox) {

          // then render the rect graphics based on current worldX and worldY  
          this.dragGraphics.clear();

          this.dragRect.width = worldX - this.dragRect.x;
          this.dragRect.height = worldY - this.dragRect.y;

          this.dragGraphics.strokeRectShape(this.dragRect);
        }
      }
      */
    }

    onMouseDown(mouseX, mouseY, button) {
      
      if(button === 0 && this.dragRect) {
        var worldX = this.cameras.main.scrollX + mouseX;
        var worldY = this.cameras.main.scrollY + mouseY; 

        // implement dragging logic here
        // change this so there is some kind of buffer distance before the box starts being dragged
        this.leftMouseIsDown = true;

        this.dragRect.x = worldX;
        this.dragRect.y = worldY;
      }
    }

    onMouseUp(mouseX, mouseY, button) {
       //console.log("clickX: " + (this.cameras.main.scrollX + mouseX) + " clickY: " + (this.cameras.main.scrollY + mouseY)
       // + "button: " + button);

        var worldX = this.cameras.main.scrollX + mouseX;
        var worldY = this.cameras.main.scrollY + mouseY;  

        if(button === 0) {

          this.leftMouseIsDown = false;

          if(this.dragGraphics && this.dragRect) {

            if(this.isDraggingBox) {

              // todo: selection logic here

              // cycle through all chars and see if they are within the bounds of this rectangle

              //Object.values(this.characters).forEach(char => {
              this.ownedCharacters.forEach(char => {  
                if(Phaser.Geom.Rectangle.Contains(this.dragRect, char.sprite.x, char.sprite.y)
                  ) {
                  char.select();
                  // reflect this change graphically

                } else {
                  char.deselect();
                }
              });

              this.isDraggingBox = false;
              this.dragGraphics.clear();
            }
            else {
            Object.values(this.characters).forEach(char => {

              if(worldX > char.sprite.x - char.sprite.displayWidth / 2 && 
                worldX < char.sprite.x + char.sprite.displayWidth / 2 &&
                worldY > char.sprite.y - char.sprite.displayHeight / 2 &&
                worldY < char.sprite.y + char.sprite.displayHeight / 2 &&
                char.username === window.username) {
                // select this character
                char.select();
              } else {
                //char.isSelected = false;
                char.deselect();
              }
            });
          }
        }
      }

        if(button === 2) {

          

          // change to cycle through selected characters and set these coords as their movement target

          // OPTIONAL -----------------
          // NOTE - for char movement clicks, client side should do some prediction so the user gets the impression of instant reaction
          // to his rapid clicks

          // send a single msg data object
          var moveData = {};
          moveData['refnos'] = [];
          var charIsSelected = false;

          Object.values(this.characters).forEach(char => {
            if(char.isSelected) {
              charIsSelected = true;

              // need an array of refnos
              // and 1 property of the requested positions
              moveData.refnos.push(char.refno);
            }
          });

          if(charIsSelected) {

            var enemyTargeted = false;

            for(var key in this.characters) {
              var char = this.characters[key];  

              if(worldX > char.sprite.x - char.sprite.displayWidth / 2 && 
                worldX < char.sprite.x + char.sprite.displayWidth / 2 &&
                worldY > char.sprite.y - char.sprite.displayHeight / 2 &&
                worldY < char.sprite.y + char.sprite.displayHeight / 2 &&
                char.username !== window.username &&
                !char.isDead) {

                // select this character
                enemyTargeted = true;
                moveData['target'] = char.refno;
                window.sendTargetEnemy(moveData);
                break;
              } 
            }

            if(!enemyTargeted) {

              console.log("attempting to send move pos");
              // else
              moveData.x = worldX;
              moveData.y = worldY; 
              window.sendMovePos(moveData);
            }
          }
        }
    }

    spawnCharacter(character) {

      var newSprite = this.add.sprite(character.x, character.y, character.kind);  //character.type);

      var newCharacter = new Character(
      {
        scene: this,
        refno: character.refno,
        sprite : newSprite,
        name: character.name,
        kind: character.kind,
        username: character.username,
        isSelected: false,
        selectGraphics: this.add.graphics({
        lineStyle: { width: 1, color: 0xffffff, alpha: 0.3 }}),
        healthGraphics : this.add.graphics({
        lineStyle: { width: 4, color: 0x23f720 }}),
        health : character.health,
        totalHealth : character.totalHealth,
        isMyChar : false,
        charNo : character.charNo
      });

      // add newSprite to list
      this.characters[character.refno] = newCharacter;

      if(newCharacter.username === window.username) {
        newCharacter.isMyChar = true;
        this.ownedCharacters.push(newCharacter);
        //this.myChar = newCharacter;

      }
    }

    onNewUserSpawned(data) {
      data.forEach(char => {
        this.spawnCharacter(char);
      });
    }

    keySelectAll() {
      this.ownedCharacters.forEach(char => {
        char.select();
      });
    }

    keySelectCharacter(num) {
      console.log("calling select character");

      this.ownedCharacters.forEach(char => {
        char.deselect();
      });
      if(num > 0 && num < 4 && this.ownedCharacters[num-1])
        this.ownedCharacters[num-1].select();
    }

    onHealthChange(refno, newHealth) {  
      console.log("received on health change");
      this.characters[refno].onHealthChange(newHealth);
    }

    createProjectile(projectileId, projectileKind, x, y, xMovementSpeed, yMovementSpeed) {
            let config = {
                key: 'testprojectile',
                x: x,
                y: y
            };

            this.projectile = {
              sprite: this.make.sprite(config),
              xMove: xMovementSpeed,
              yMove: yMovementSpeed
            };

            // add projectile to an object using an id, so it can be updated or destroyed in the update loop
            this.projectiles[id] = this.projectile;
    }

    onNewEvent(event) {
      /*
      var returnEvent = {
      k: this.kind,
      n: this.abilityNo,
      o: this.owner,
    }

    switch(this.kind) {
      case process.enums.EventTypes.AbilityStart:
        break;
      case process.enums.EventTypes.SpawnProjectile:
        returnEvent.
        returnEvent.x = this.projectile.x;
        returnEvent.y = this.projectile.y;
        returnEvent.tx = this.projectile.targetX;
        returnEvent.ty = this.projectile.targetY;
        returnEvent.ms = this.projectile.movementSpeed;
        returnEvent.pk = this.projectile.kind;
        break;
    }
    return returnEvent;
    
    */
      var eventKind = event.k;
      var abilityNo = event.n;
      var owner = event.o;

      switch(eventKind) {
        case window.enums.EventTypes.SpawnProjectile:
          console.log("spawning projectile..."
            + " kind:" + event.k 
            + " number: " + event.n 
            + " owner: " + event.o
            + " x: " + event.x
            + " y: " + event.y
            + " mx: " + event.mx
            + " my " + event.my
            + " pk " + event.pk);

          // create projectile here
          this.createProjectile(event.pid, event.pk, event.x, event.y, event.mx, event.my);

          break;
      }

        /*

      var eventType = event.t;

      if(eventType === Enums.EventTypes.Death) {
          // find character and animate death
          // make him unselectable
          this.characters[event.r].onDeath(); // refno
      } 

      /*
      else if(eventType === Enums.EventTypes.MovementStopped) {
        this.characters[event.r].onMovementStopped();      
      } 
      */
      /*
      else if(eventType === Enums.EventTypes.MeleeAttackStart) {
        // animate melee attack
        console.log("animating melee attack");
        this.characters[event.c].onStartMeleeAttack();
      } else {

        // default fall through event type here
        // don't do anything for now
        
        // if/switch statement

        var caster = this.characters[event.c];
        var receiver = this.characters[event.r];
        //var damage = event.damage;

        //target.takeDamage;
      }
      */
    }

    onNewPos(data) {
      Object.keys(data).forEach(refno => {
        var char = this.characters[refno];

        char.onPosChange(data[refno].x, data[refno].y);

        if(char) {
          //char.sprite.x = data[refno].x;
          //char.sprite.y = data[refno].y;
          //char.selectGraphics.x = char.sprite.x - char.sprite.width / 2 + 2;
          //char.selectGraphics.y = char.sprite.y - char.sprite.height / 2 + 1;
          //char.healthGraphics.x = char.sprite.x - char.sprite.width / 2;
          //char.healthGraphics.y = char.sprite.y - char.sprite.height / 2;
        }
      });
    }

    create() {

      // recode this so it runs as a loop and sets the animations for all character types

      // reference animations class here

      // can do this after
      SetupCharacterAnimations(this);

      ////////////////////////////////////////////////////
      /*
      for(var i = window.charactersToSpawn.length - 1; i > -1; i--) {
          //console.log("char: " + char.refno);
          this.spawnCharacter(spawnData.characters[i]);
        }
      */   
        
      console.log("calling create");

      // spawning doesn't need to be done here, it can be done on receiving spawn message
      window.charactersToSpawn.forEach(char => {
        this.spawnCharacter(char);
        console.log("spawned char: " + char.refno);
      });
        
      window.setupAbilities();
        
      // todo: make for mage and priest
      /*
      this.anims.create({
        key: '',
      });
      */
      /*
      const map = this.make.tilemap({ key: "map" });

      const tileset = map.addTilesetImage("stardew_spring_tileset", "tiles");

      const layer1 = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
      const layer2 = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);
      */

      const camera = this.cameras.main;
      
      //camera.setZoom();

      // Set up the arrows to control the camera
      const cursors = this.input.keyboard.createCursorKeys();

      this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.75
      });
      /*
      this.dragRect = new Phaser.Geom.Rectangle(0, 0, 1, 1);
      this.dragGraphics = this.add.graphics({ 
        lineStyle: { 
          lineWidth: 2,      
          color: 0x0000ff,  
          alpha: 1
        } 
      });
      this.leftLine = this.dragGraphics.lineBetween(0, 0, 0, 2);
      this.topLine = this.dragGraphics.lineBetween(0, 0, 1, 0);
      this.rightLine = this.dragGraphics.lineBetween(1, 0, 1, 1);
      this.bottomLine = this.dragGraphics.lineBetween(0, 1, 1, 1);

      //graphics.setInteractive(rect, event);
      */

      this.dragGraphics = this.add.graphics({
        lineStyle: { width: 2, color: 0xaa0000 }});

      this.dragGraphics.depth = 1000;

      this.dragRect = new Phaser.Geom.Rectangle();

      this.input.on('pointerdown', function (pointer) {
        if(pointer.rightButtonDown()) {

          // get coords and send to server

        }
      }, this);

      this.input.on('pointermove', function (pointer) {

      }, this);

      console.log("CREATE FINISHED");

    }

    moveCamX(num) {
      this.xCamMove = num;
    }

    moveCamY(num) {
      this.yCamMove = num;
    }

    update(time, delta) {

      if(this.world) {
        // update world - this should be the main entry point for updating all gObjects
        this.world.update(time, delta);
      }

      // cam movement
      if(this.xCamMove > 0 || this.xCamMove < 0) {
          this.cameras.main.scrollX += this.xCamMove * delta;
      }

      if(this.yCamMove > 0 || this.yCamMove < 0) {
          this.cameras.main.scrollY += this.yCamMove * delta;
      }

      this.controls.update(delta);

      this.onMoveMainChar(delta);

      //this.characters.forEach

      Object.values(this.characters).forEach(char => {
        char.update(delta);
      });
    }
}

export default OldMainScene;