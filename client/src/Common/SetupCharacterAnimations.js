
const SetupCharacterAnimations = (scene) => {

  const characterTypes = ['warrior', 'mage', 'priest', 'archer'];       

  const walkFramerate  = 12;

  const attackFramerate = 27;

  scene.anims.create({
    key: 'warrior' + 'up',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 95, end: 102}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'upright',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 219, end: 226}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'right',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 64, end: 71}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'downright',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 157, end: 164}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'down',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 2, end: 9}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'downleft',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 126, end: 133}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'left',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 33, end: 40}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'upleft',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 188, end: 195}),
    frameRate: walkFramerate,
    repeat: -1
  });


//////////////////////////////////////


  scene.anims.create({
    key: 'warrior' + 'upidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 93, end: 93}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'uprightidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 218, end: 218}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'rightidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 62, end: 62}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'downrightidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 155, end: 155}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'downidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 0, end: 0}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'downleftidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 124, end: 124}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'leftidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 31, end: 31}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'warrior' + 'upleftidle',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 186, end: 186}),
    frameRate: walkFramerate,
    repeat: -1
  });

///////////////////////////////////////////////////////


  scene.anims.create({
    key: 'warrior' + 'upattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 103, end: 109}),
    frameRate: attackFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'warrior' + 'uprightattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 227, end: 233}),
    frameRate: attackFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'warrior' + 'rightattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 71, end: 77}),
    frameRate: attackFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'warrior' + 'downrightattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 165, end: 171}),
    frameRate: attackFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'warrior' + 'downattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 10, end: 16}),
    frameRate: attackFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'warrior' + 'downleftattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 134, end: 140}),
    frameRate: attackFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'warrior' + 'leftattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 41, end: 47}),
    frameRate: attackFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'warrior' + 'upleftattack',
    frames: scene.anims.generateFrameNumbers('warrior', {start: 196, end: 202}),
    frameRate: attackFramerate,
    repeat: 0
  });


  ///////////////////////////////////////////////////////////////

  //27


  scene.anims.create({
    key: 'mage' + 'down',
    frames: scene.anims.generateFrameNumbers('mage', {start: 2, end: 9}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'left',
    frames: scene.anims.generateFrameNumbers('mage', {start: 29, end: 36}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'right',
    frames: scene.anims.generateFrameNumbers('mage', {start: 56, end: 63}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'up',
    frames: scene.anims.generateFrameNumbers('mage', {start: 83, end: 90}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'downleft',
    frames: scene.anims.generateFrameNumbers('mage', {start: 110, end: 117}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'downright',
    frames: scene.anims.generateFrameNumbers('mage', {start: 137, end: 144}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'upleft',
    frames: scene.anims.generateFrameNumbers('mage', {start: 164, end: 171}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'upright',
    frames: scene.anims.generateFrameNumbers('mage', {start: 191, end: 198}),
    frameRate: walkFramerate,
    repeat: -1
  });    


//////////////////////////////////////




  scene.anims.create({
    key: 'mage' + 'downidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 0, end: 0}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'leftidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 27, end: 27}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'rightidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 54, end: 54}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'upidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 81, end: 81}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'downleftidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 108, end: 108}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'downrightidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 135, end: 135}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'upleftidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 162, end: 162}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'mage' + 'uprightidle',
    frames: scene.anims.generateFrameNumbers('mage', {start: 189, end: 189}),
    frameRate: walkFramerate,
    repeat: -1
  });   


  /////////////////////////////////////


  scene.anims.create({
    key: 'mage' + 'downattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 10, end: 16}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'mage' + 'leftattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 37, end: 43}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'mage' + 'rightattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 64, end: 70}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'mage' + 'upattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 91, end: 97}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'mage' + 'downleftattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 118, end: 124}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'mage' + 'downrightattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 145, end: 151}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'mage' + 'upleftattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 172, end: 178}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'mage' + 'uprightattack',
    frames: scene.anims.generateFrameNumbers('mage', {start: 199, end: 205}),
    frameRate: walkFramerate,
    repeat: 0
  });    


///////////////////////////////////////////////////////

      
  
  scene.anims.create({
    key: 'priest' + 'down',
    frames: scene.anims.generateFrameNumbers('priest', {start: 2, end: 9}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'left',
    frames: scene.anims.generateFrameNumbers('priest', {start: 27, end: 34}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'right',
    frames: scene.anims.generateFrameNumbers('priest', {start: 52, end: 59}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'up',
    frames: scene.anims.generateFrameNumbers('priest', {start: 77, end: 84}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'downleft',
    frames: scene.anims.generateFrameNumbers('priest', {start: 102, end: 109}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'downright',
    frames: scene.anims.generateFrameNumbers('priest', {start: 127, end: 134}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'upleft',
    frames: scene.anims.generateFrameNumbers('priest', {start: 152, end: 159}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'upright',
    frames: scene.anims.generateFrameNumbers('priest', {start: 177, end: 184}),
    frameRate: walkFramerate,
    repeat: -1
  });    



////////////////////////////////////



  scene.anims.create({
    key: 'priest' + 'downidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 0, end: 0}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'leftidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 27, end: 27}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'rightidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 54, end: 54}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'upidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 81, end: 81}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'downleftidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 108, end: 108}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'downrightidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 135, end: 135}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'upleftidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 162, end: 162}),
    frameRate: walkFramerate,
    repeat: -1
  });

  scene.anims.create({
    key: 'priest' + 'uprightidle',
    frames: scene.anims.generateFrameNumbers('priest', {start: 189, end: 189}),
    frameRate: walkFramerate,
    repeat: -1
  });   


  //////////////////////////////////////////////////////

  
  scene.anims.create({
    key: 'priest' + 'downattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 10, end: 16}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'priest' + 'leftattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 35, end: 41}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'priest' + 'rightattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 60, end: 66}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'priest' + 'upattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 85, end: 91}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'priest' + 'downleftattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 110, end: 116}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'priest' + 'downrightattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 135, end: 141}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'priest' + 'upleftattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 160, end: 166}),
    frameRate: walkFramerate,
    repeat: 0
  });

  scene.anims.create({
    key: 'priest' + 'uprightattack',
    frames: scene.anims.generateFrameNumbers('priest', {start: 185, end: 191}),
    frameRate: walkFramerate,
    repeat: 0
  });    
}

export default SetupCharacterAnimations;