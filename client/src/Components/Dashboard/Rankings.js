import React, { Component } from 'react';
import './Dashboard.css';

export default class Profile extends Component {
  
	constructor() {
		super();

    this.state = {

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

      			<ul>
              <li>List of rankings here</li>
      				<li><button onClick={this.onBackPress}>Back</button></li>
      			</ul>
      		</div>
    	)
  	}
}