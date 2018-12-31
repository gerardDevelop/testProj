import React, { Component } from 'react';
import './Dashboard.css';

export default class Matchmake extends Component {
  
	constructor() {
		super();

		this.state = {
			lookingForMatch: false,
			elapsedTime: 0
		};

		this.onStartMatchmaking = this.onStartMatchmaking.bind(this);
		this.onStopMatchmaking = this.onStopMatchmaking.bind(this);
		this.onBackPress = this.onBackPress.bind(this);
		this.updateLookingForMatchTime = this.updateLookingForMatchTime.bind(this);
	}

	onStartPracticeMatch() {
		window.lookingForPracticeMatch = true;
		window.lookingForMatchElapsedTime = 0;
	}

	onStartMatchmaking() {
		// send signal to server to start matchmaking

		window.lookingForMatch = true;
		window.lookingForMatchElapsedTime = 0;

		this.setState({
			lookingForMatch : true
		});
	}

	onStopMatchmaking() {
		window.lookingForMatch = false;

		this.setState({
			lookingForMatch : false
		});
	}

	onBackPress() {
		// go back to dashboard
		window.changeAppPage("dashboard");
	}

	updateLookingForMatchTime(time) {
		this.setState({
			elapsedTime : Math.round(time / 1000)
		});
	}	

	componentDidMount() {
		window.updateLookingForMatchTime = this.updateLookingForMatchTime;

		console.log("loaded matchmake");

		// check with window object if user is currently looking for a match...
		// if so, update this state to displayLookingForMatch
		if(window.lookingForMatch) {
			this.setState({
				lookingForMatch : true
			});
		}
	}

  	render() {
    	return (
      		<div className="simple-center-box" onMouseDown={this.props.onMouseDown}>	

      			{/*  */}

      			<ul>
					{this.state.lookingForMatch ? 
					  <li><button onClick={this.onStopMatchmaking}>Stop matchmaking</button></li>
					: <li><button onClick={this.onStartMatchmaking}>Start matchmaking</button></li>}      			
      				
					{this.state.lookingForMatch ? 
					  <li><button onClick={this.onStopPracticeMatchmaking}>Stop practice matchmaking</button></li>
					: <li><button onClick={this.onStartPracticeMatchmaking}>Start practice matchmaking</button></li>}

					<li><button onClick={this.onBackPress}>Back</button></li>
      			</ul>

      			{ this.state.lookingForMatch ? 
      				<div className="alert alert-success" role="alert">
  						Looking for match...{" " + this.state.elapsedTime + " seconds elasped"} 
					</div> 
				: null }
      		</div>
    	)
  	}
}