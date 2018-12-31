import React, { Component } from 'react';
import './Landing.css';

export default class Landing extends Component {
  
	constructor() {
		super();

		this.state = {
			username : "",
			password : ""
		}

		this.usernameOnChange = this.usernameOnChange.bind(this);
		this.passwordOnChange = this.passwordOnChange.bind(this);
		this.onLoginPress = this.onLoginPress.bind(this);
		this.onRegisterPress = this.onRegisterPress.bind(this);
		this.inputOnFocus = this.inputOnFocus.bind(this);
		this.inputOnFocusOut = this.inputOnFocusOut.bind(this);
		this.imageButtonClick = this.imageButtonClick.bind(this);
	}

	usernameOnChange(e) {
		this.setState({ username: e.target.value });
	}

	passwordOnChange(e) {
		this.setState({ password: e.target.value });
	}

	onLoginPress() {
		console.log("logging in with username: " + this.state.username + 
			" and password: " + this.state.password);

		// refer to socket in window object
		window.Login(this.state.username, this.state.password);
	}

	onRegisterPress() {
		console.log("pressed register");

		// change global state to "register"
		window.changeAppPage("register");
	}

	componentDidMount() {

	}

	inputOnFocus() {
		window.isTyping = true;
	}

	inputOnFocusOut() {
		window.isTyping = false;
	}

	imageButtonClick() {
		console.log("TEST BUTTON CLICKED");
	}

  	render() {
    	return (
      		<div className="simple-center-box" onMouseDown={this.props.onMouseDown}>	

      			{ /*  login form here */ }

      			<h1>
      				Login
      			</h1>

      			<ul>
      				<li><input 
      					type="text" 
      					name="username"
      					placeholder="Username"
      					onChange={this.usernameOnChange}
      					onFocus={this.inputOnFocus}
      					onBlur={this.inputOnFocusOut}></input>
      						</li>
      				<li><input 
      					type="password" 
      					name="password"
      					placeholder="Password"
      					onChange={this.passwordOnChange}
      					onFocus={this.inputOnFocus}
      					onBlur={this.inputOnFocusOut}></input>
      						</li>
      				<li><button onClick={this.onLoginPress}>Login</button></li>
      				<li><button onClick={this.onRegisterPress}>Register</button></li>
      			</ul>
      			
      		</div>
    	)
  	}
}
