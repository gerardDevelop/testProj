import React, { Component } from 'react';
import './Dashboard.css';

export default class Dashboard extends Component {
  
	constructor() {
		super();

		this.onTestRun = this.onTestRun.bind(this);
		this.onMatchmake = this.onMatchmake.bind(this);
		this.onRankings = this.onRankings.bind(this);
		this.onProfile = this.onProfile.bind(this);
		this.onSettings = this.onSettings.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onWarriorRadioClick = this.onWarriorRadioClick.bind(this);
		this.onMageRadioClick = this.onMageRadioClick.bind(this);
		this.onPriestRadioClick = this.onPriestRadioClick.bind(this);
		this.onWarriorRadioClick2 = this.onWarriorRadioClick2.bind(this);
		this.onMageRadioClick2 = this.onMageRadioClick2.bind(this);
		this.onPriestRadioClick2 = this.onPriestRadioClick2.bind(this);

		this.charChoice1 = 'warrior'; //default
		this.charChoice2 = 'priest';
	}

	componentDidMount() {

	}

	onTestRun(e) {
		// send signal to server
		//console.log("ontestrun using: " + this.charChoice1 + " " + this.charChoice2);
		
		//window.OnTestRun(this.charChoice1, this.charChoice2);
		window.OnTestRun();
	}

	onMatchmake(e) {
		window.changeAppPage("matchmake");
	}

	onRankings(e) {
		window.changeAppPage("rankings");
	}

	onProfile(e) {
		window.changeAppPage("profile");
	}

	onSettings(e) {
		window.changeAppPage("settings");
	}

	onLogout(e) {
		// todo: clear user object

		window.lookingForMatch = false;
		window.lookingForMatchElapsedTime = 0;

		window.username = null;
		window.rating = null;
		window.wins = null;
		window.losses = null;
		window.practiceGames = null;

		window.changeAppPage("landing");
	}

	onWarriorRadioClick(e) {
		this.charChoice1 = 'warrior';
	}

	onMageRadioClick(e) {
		this.charChoice1 = 'mage';
	}

	onPriestRadioClick(e) {
		this.charChoice1 = 'priest';
	}

	onWarriorRadioClick2(e) {
		this.charChoice2 = 'warrior';
	}

	onMageRadioClick2(e) {
		this.charChoice2 = 'mage';
	}

	onPriestRadioClick2(e) {
		this.charChoice2 = 'priest';
	}

  	render() {
    	return (
      		<div className="simple-center-box" onMouseDown={this.props.onMouseDown}>	

      			{/*  */}

      			<div className="radio whitefont">
      			<span>1</span>
  					<label><input type="radio" name="optradio" onClick={this.onWarriorRadioClick}/>Type1</label>
  					<label><input type="radio" name="optradio" onClick={this.onMageRadioClick}/>Type2</label>
  					<label><input type="radio" name="optradio" onClick={this.onPriestRadioClick}/>Type3</label>
				</div>

				<div className="radio whitefont">
				<span>2</span>
  					<label><input type="radio" name="optradio2" onClick={this.onWarriorRadioClick2}/>Type1</label>
  					<label><input type="radio" name="optradio2" onClick={this.onMageRadioClick2}/>Type2</label>
  					<label><input type="radio" name="optradio2" onClick={this.onPriestRadioClick2}/>Type3</label>
				</div>

      			<ul>
      				<li><button onClick={this.onTestRun}>Test Run</button></li>
      				
      				{/*
      				<li><button onClick={this.onMatchmake}>Matchmake</button></li>
      				<li><button onClick={this.onRankings}>Rankings</button></li>
      				<li><button onClick={this.onProfile}>Profile</button></li>
      				<li><button onClick={this.onSettings}>Settings</button></li>
      				<li><button onClick={this.onLogout}>Logout</button></li>
      				*/}
      			</ul>
      		</div>
    	)
  	}
}
