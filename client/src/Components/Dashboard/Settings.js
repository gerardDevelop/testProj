import React, { Component } from 'react';
import './Dashboard.css';

export default class Settings extends Component {
  
	constructor() {
		super();

		this.onBackPress = this.onBackPress.bind(this);
	}

	componentDidMount() {

	}

	onBackPress() {
		window.changeAppPage("dashboard");
	}

  	render() {
    	return (
      		<div className="simple-center-box" onMouseDown={this.props.onMouseDown}>	

      			{/*  */}


      			<ul>
      				<li><button onClick={this.onBackPress}>Back</button></li>
      			</ul>
      		</div>
    	)
  	}
}