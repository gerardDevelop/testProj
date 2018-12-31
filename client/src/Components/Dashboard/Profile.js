import React, { Component } from 'react';
import './Dashboard.css';

export default class Profile extends Component {
  
	constructor() {
		super();

    this.state = {
      rating : 1600,
      wins: 0,
      losses: 0,
      practiceGames: 0
    };

		this.onBackPress = this.onBackPress.bind(this);
	}

	componentDidMount() {
    // get rating
    this.setState({
      rating: window.rating,
      wins: window.wins,
      losses: window.losses,
      practiceGames: window.practiceGames
    });
	}

	onBackPress() {
		window.changeAppPage("dashboard");
	}

  	render() {
    	return (
      		<div className="simple-center-box" onMouseDown={this.props.onMouseDown}>	

      			{/*  */}

            <div className="alert alert-primary" role="alert">
              { "Rating: " + this.state.rating + "\n" +
              "Wins: " + this.state.wins + "\n" +
              "Losses: " + this.state.losses + "\n" + 
              "Practice Games: " + this.state.practiceGames 
               }
            </div>

      			<ul>
      				<li><button onClick={this.onBackPress}>Back</button></li>
      			</ul>
      		</div>
    	)
  	}
}