
import Character from '../Common/Character';
import Enums from '../Common/Enums';
import SetupCharacterAnimations from '../Common/SetupCharacterAnimations';
import cWorld from '../types/cWorld';

class MainScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainScene'
        });

        window.mainScene = this;
        window.main = this;
    }

    startNewWorld() {
      this.world = new cWorld();
      window.world = this.world;
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

    onButtonDown(button) {
      
    }

    onButtonUp(button) {

    }

    onMouseMove(mouseX, mouseY) {
      
    }

    onMouseDown(mouseX, mouseY, button) {

    }

    onMouseUp(mouseX, mouseY, button) {

    }

    create() {

      this.anims.create({
        key: 'nuclear1' + 'idle',
        frames: this.anims.generateFrameNumbers('nuclear1', { start: 0, end: 3 }),
        frameRate: 5,
        repeat: 0
      });

      this.anims.create({
        key: 'nuclear1' + 'run',
        frames: this.anims.generateFrameNumbers('nuclear1', { start: 6, end: 11 }),
        frameRate: 9,
        repeat: 0
      });

      console.log("calling create");

      //const layer1 = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
      //const layer2 = map.createStaticLayer("Tile Layer 2", tileset, 0, 0);

      const camera = this.cameras.main;

      // todo: control zoom with mouse  (IMPORTANT: MOUSE CLICKS HAVE TO ACCOUNT FOR THE ZOOM)
      //camera.zoom = 2; // default for now

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

      console.log("CREATE FINISHED");
    }

    moveCamX(num) {
      this.xCamMove = num;
    }

    moveCamY(num) {
      this.yCamMove = num;
    }

    update(time, delta) {
      this.controls.update(delta);

      window.currentTime = time;

      if(window.world) {

        window.world.update(time, delta);

        

        Object.values(window.actionRows).forEach(row => {
          Object.values(row).forEach(button => {
            button.update(time);
          });
        });
           
          //for(var j = 0; j < window.actionRows[i].length; j++) {
            //console.log("updating action button");
           // window.actionRows[i][j].update(time);
         // }
        
      }
    }
}

export default MainScene;