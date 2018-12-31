class DashboardScene extends Phaser.Scene {
  constructor(test) {
      super({
          key: 'DashboardScene'
      });
  }
  preload() {
    
  }
  create() {
  
  }

  update(time, delta) {
    
  }

  startMainScene() {
    /*
      this.scene.stop('MainScene');
      this.registry.set('attractMode', false);
      this.scene.start('MainScene');
      */
  }

  restartMainScene() {
    /*
      //        this.attractMode.stop();
      this.scene.stop('MainScene');
      this.scene.launch('MainScene');
      this.scene.bringToTop();

      this.registry.set('restartScene', false);
  */
  }
}

export default DashboardScene;
