import React, { Component } from 'react';

export default class Register extends Component {
  
	constructor() {
		super();

		this.state = {
			email: "",
			username : "",
			password : "",
			displaySuccess : false,
			displayMessage : "",
			displayFailure : false
		}

		this.emailOnChange = this.emailOnChange.bind(this);
		this.usernameOnChange = this.usernameOnChange.bind(this);
		this.passwordOnChange = this.passwordOnChange.bind(this);

		this.onRegisterPress = this.onRegisterPress.bind(this);
		this.onBackPress = this.onBackPress.bind(this);

		this.onRegistrationSuccess = this.onRegistrationSuccess.bind(this);
		this.onRegistrationError = this.onRegistrationError.bind(this);
	}

	onRegistrationSuccess() {
		// alter message here
		this.setState({
			displaySuccess: true,
			displayFailure : false,
			displayMessage : "Successful registration"
		});
	}

	onRegistrationError(msg) {
		this.setState({
			displaySuccess: false,
			displayFailure: true,
			displayMessage: msg
		});
	}

	emailOnChange(e) {
		this.setState({
			email: e.target.value
		});
	}

	usernameOnChange(e) {
		this.setState({ 
			username: e.target.value 
		});
	}

	passwordOnChange(e) {
		this.setState({ 
			password: e.target.value 
		});
	}

	onRegisterPress() {
		console.log("regstering account, username: " + this.state.username + 
			" and password: " + this.state.password);

		// refer to socket in window object
		window.Register(this.state.username, this.state.email, this.state.password);

		// display loader css, await server response
	}

	onBackPress() {
		console.log("pressed back");

		window.changeAppPage("landing");
	}

	componentDidMount() {
		window.onRegistrationSuccess = this.onRegistrationSuccess;
		window.onRegistrationError = this.onRegistrationError;
	}

  	render() {
    	return (
      		<div className="simple-center-box" onMouseDown={this.props.onMouseDown}>	

      			{ /*  login form here */ }	

      			<ul>
      				<li><input 
      					type="email" 
      					name="email"
      					placeholder="Email"
      					onChange={this.emailOnChange}></input>
      						</li>
      				<li><input 
      					type="text" 
      					name="username"
      					placeholder="Username"
      					onChange={this.usernameOnChange}></input>
      						</li>
      				<li><input 
      					type="password" 
      					name="password"
      					placeholder="Password"
      					onChange={this.passwordOnChange}></input>
      						</li>
      				<li><button onClick={this.onRegisterPress}>Register</button></li>
      				<li><button onClick={this.onBackPress}>Back</button></li>
      			</ul>
      			
      			{ this.state.displaySuccess ? 
      				<div className="alert alert-success" role="alert">
  						{this.state.displayMessage}
					</div> 
				: null }

				{ this.state.displayFailure ?
					<div className="alert alert-danger" role="alert">
  						{this.state.displayMessage}
					</div> 
				: null }
      			
      		</div>
    	)
  	}
}
