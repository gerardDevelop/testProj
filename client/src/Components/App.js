import React, { Component } from 'react';
import './App.css';
import MainLayout from './MainLayout/MainLayout';
import MainUI from './MainUI/MainUI';
import Dashboard from './Dashboard/Dashboard';
import Landing from './Landing/Landing';
import Register from './Register/Register';
import Settings from './Dashboard/Settings';
import Profile from './Dashboard/Profile';
import Matchmake from './Dashboard/Matchmake';
import Rankings from './Dashboard/Rankings';
import ActionBar from './MainUI/ActionBar/ActionBar';

export default class App extends Component {

	constructor() {
		super();

    this.state = {
      pagePos : "landing",
      cursor : "url(assets/cursors/handcursor.cur), auto",
    };

		this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.changeAppPage = this.changeAppPage.bind(this);
    this.onDivMouseDown = this.onDivMouseDown.bind(this);

    this.currentCursor = "h";

    this.setSwordCursor = this.setSwordCursor.bind(this);
    this.setHandCursor = this.setHandCursor.bind(this);

    window.setSwordCursor = this.setSwordCursor;
    window.setHandCursor = this.setHandCursor;
	}

  // called from hover manager
  setSwordCursor() {
     if(this.currentCursor !== "s") {

        this.setState({
          cursor : "url(assets/cursors/swordcursor.cur), auto"
        });

        this.currentCursor = "s";
      }
  }

  // called from hover manager
  setHandCursor() {
    if(this.currentCursor !== "h") {

      this.setState({
        cursor : "url(assets/cursors/handcursor.cur), auto"
      });

      this.currentCursor = "h";
    }
  }

  componentWillMount(){
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentDidMount() {
    window.changeAppPage = this.changeAppPage;
  }

	onMouseUp(e) {
		window.onScreenMouseUp(e);
	}

  onMouseDown(e) {
    window.onScreenMouseDown(e);
  }

  onMouseMove(e) {
    window.onScreenMouseMove(e);
  }

  changeAppPage(name) {
    this.setState({
      pagePos: name
    });
  }

/*

document.getElementById('react-root').onmouseup = function(event) {
//document.body.onmouseup = function(event) {
    console.log("Mouse up: " + event.button);
    game.scene.keys["GameScene"].testWorldPos(event.x, event.y);
}

*/

  onDivMouseDown(e) {
    console.log("onDivMouseDown triggered");
    e.stopPropagation();
  }

  handleKeyDown(e) {
    if(!window.isTyping) {
      if(window.keybinds) {
        if(window.keybinds.hasOwnProperty(e.which) && window.inGame) {
          window.keybinds[e.which](true);
        } 
      }
    }
  }

  handleKeyUp(e) {
    if(!window.isTyping) {
      if(window.keybinds) {
        //console.log("KEYCODE: " + e.which);
        if(window.keybinds.hasOwnProperty(e.which) && window.inGame) {
          window.keybinds[e.which](false);
        } 
      }
    }
  }

  render() {

    var toRender = null;

    switch(this.state.pagePos) {
      
      // todo
      // action bar
      // keybinds
      // character portrait ui
      // in game menu (can be switched on/off)  


      case "in main": {
        toRender = (
            <ActionBar />
          );
        break;
      }

      case "landing": {
        toRender = (
          <Landing onMouseDown={this.onDivMouseDown} />
        );
        break;
      }

      case "register": {
        toRender = (
          <Register />
        );
        break;
      }

      case "dashboard": {
        toRender = (
          <Dashboard onMouseDown={this.onDivMouseDown} />
        );
        break;
      }

      case "matchmake": {
        toRender = (
          <Matchmake />
        );
        break;
      }

      case "rankings": {
        toRender = (
          <Rankings />
        );
        break;
      }

      case "profile": {
        toRender = (
          <Profile />
        );
        break;    
      }

      case "settings": {
        toRender = (
          <Settings />
        );
        break;
      }
    }

    
    return (
      <div style={{ cursor: this.state.cursor }} onMouseUp={this.onMouseUp} className="App" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}>

        {toRender}

      </div>
    )
    
    /*
    return (
      <div onMouseUp={this.onMouseUp} className="App" onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove}>
        {toRender}
      </div>
    )
    */
  }
}
