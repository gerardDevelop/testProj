import 'phaser';

import BootScene from './Scenes/BootScene';
import DashboardScene from './Scenes/DashboardScene';
import MainScene from './Scenes/MainScene';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App';

import io from 'socket.io-client';
import SocketHandlers from './socket/SocketHandlers';

import CommonFunctions from './Common/CommonFunctions';

import ClickManager from './managers/ClickManager';
import HoverManager from './managers/HoverManager';
import ActionBarManager from './managers/ActionBarManager';
import AbilityManager from './managers/AbilityManager';
import AbilityReceiver from './managers/AbilityReceiver';

import SocketSender from './socket/SocketSender';

ReactDOM.render(
  <App />,
  document.getElementById('react-root')
);

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    //roundPixels: true,
    parent: 'content',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade'
    },
    scene: [
        BootScene,
        DashboardScene,
        MainScene
    ]
};

const main = new Phaser.Game(config);

window.main = main;

window.inGame = false;

//const mainManager = new MainManager();

//window.mainManager = mainManager;

document.addEventListener('contextmenu', event => event.preventDefault());

window.addEventListener('resize', () => {
    console.log("calling resize");
    main.resize(window.innerWidth, window.innerHeight);
    main.scene.keys["MainScene"].resize(window.innerWidth, window.innerHeight);
});

/*
document.body.onmousedown = function(event) { 
    //main.scene.start('MainScene');
    
}
*/

window.onScreenMouseMove = (e) => {

    //main.scene.keys["MainScene"].onMouseMove(mouseX, mouseY);
    window.hoverManager.onMouseMove(e.nativeEvent.clientX, e.nativeEvent.clientY);
    
    /*
    if(mouseX >= 0 && mouseX < 5) {
        main.scene.keys["MainScene"].moveCamX(-1);
    } else if(mouseX <= window.innerWidth && mouseX > window.innerWidth - 5) {
        main.scene.keys["MainScene"].moveCamX(1);
    } else {
        main.scene.keys["MainScene"].moveCamX(0);
    }

    if(mouseY >= 0 && mouseY < 5) {
        main.scene.keys["MainScene"].moveCamY(-1);
        console.log("top");
    } else if(mouseY <= window.innerHeight && mouseY > window.innerHeight - 5) {
        main.scene.keys["MainScene"].moveCamY(1);
    } else {
        main.scene.keys["MainScene"].moveCamY(0);
    }
    */
}

window.onScreenMouseDown = (e) => {
    //main.scene.keys["MainScene"].onMouseDown(e.clientX, e.clientY, e.button);
    window.clickManager.onMouseDown(e);
}

window.onScreenMouseUp = (e) => {
    //console.log("on mouse up!! x: " + e.clientX + " y: " + e.clientY);
    //main.scene.keys["MainScene"].onMouseUp(e.clientX, e.clientY, e.button);

    window.clickManager.onMouseUp(e);

    // check if window.user.hasSelection

    // from e.clientX, e.clientY and e.button, send coords to server
}

const socket = io('http://localhost:8000');

const socketHandlers = new SocketHandlers(socket);

window.socketSender = new SocketSender(socket);

const commonFunctions = new CommonFunctions(socket);

window.clickManager = new ClickManager();
window.hoverManager = new HoverManager();
window.actionBarManager = new ActionBarManager();
window.abilityManager = new AbilityManager();
window.abilityReceiver = new AbilityReceiver();

// basic setup
window.lookingForMatch = false;
window.lookingForMatchElapsedTime = 0;

/// ********** basic update loop *****************// 

var frameLength = 1000 / 60; // divide by 60 for 60 fps
var newFrameTime = 0;
var prevFrameTime;

var update = function(currentTime, deltaTime) {
    
    ///console.log("updating!");

    if(lookingForMatch) {
        window.lookingForMatchElapsedTime += deltaTime;
        window.updateLookingForMatchTime(window.lookingForMatchElapsedTime);
    }
}

var timeUpdate = function() {

    var currentTime = Date.now();
    if(currentTime > newFrameTime) {
        var deltaTime = currentTime - prevFrameTime;

        update(currentTime, deltaTime);

        prevFrameTime = currentTime;
        newFrameTime = currentTime + frameLength;
    }
}

setInterval(timeUpdate, 1);

window.isTyping = false;

