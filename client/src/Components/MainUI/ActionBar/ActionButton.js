import React, { Component } from 'react';
import Enums from '../../../Common/Enums';

	/* 

	Detects click events and keypress events
	TODO override default event bubbling - ((copy from dashboard components)

	- utilize keybindings, (so create window references to this button)

	// display
		- border
		- image inside that is set externally
		- cooldown cover
	*/

	/*

  	A relatively or absolutely positioned parent container

	- Absolutely positioned image
	- Absolutley positioned cooldown cover
	- Absolutely positioned button/click register
	- Absolutely positioned paragraph

	*/

export default class ActionButton extends Component {

	constructor(props) {
		super(props);

		this.state = {
			actionicon : require('../../../../dist/assets/icons/question.jpg'),
			boxSize: 45,
			iconSize: 40,
			name: 'NULL',
			uniqueNo: this.props.row + "" + this.props.col,
			position: 10,
			cooldownOpacity: 0,
			cooldownWidth : '100%'
		};

		this.onReceiveActionProps = this.onReceiveActionProps.bind(this);
		this.triggerAction = this.triggerAction.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);
		this.getColNo = this.getColNo.bind(this);
		this.getRowNo = this.getRowNo.bind(this);
		this.onTriggerCooldown = this.onTriggerCooldown.bind(this);
		this.setCooldownWidth = this.setCooldownWidth.bind(this);
		this.onExecution = this.onExecution.bind(this);

		this.update = this.update.bind(this);
		this.cooldownFinishTime = null;
		this.cooldownTotalTime = null;
		this.isOnCooldown = false;

		this.remainingCooldownTime = 0;

		window.registerActionButton(this.props.row, this.props.col, this);

		/*
	
		receives a refno at least
		name of ability picture
		name of ability
		ability number
		ability keystroke
		current cooldown

		*/
	}

	update(time) {
		//console.log("updating actionbutton");

		if(this.isOnCooldown) {

			this.remainingCooldownTime = this.cooldownFinishTime - time;
			var percentage = this.remainingCooldownTime / this.cooldownTotalTime * 100;

			this.setCooldownWidth(percentage);
		}
	}

	onExecution() {
		//this.onTriggerCooldown(1500);
	}

	onTriggerCooldown(length) {
		console.log("triggering onTrigger cooldown: " + length);

		// todo: activate a semi transparent/dark cover effect over the action button
		this.isOnCooldown = true;
		this.cooldownFinishTime = window.currentTime + length;
		this.cooldownTotalTime = length;
		this.setState({cooldownOpacity: 0.7});
	}

	setCooldownWidth(percentage) {
		this.cooldown
		this.setState({cooldownWidth: percentage + "%"});
	}

	setAbilityProps(ability) {
		//console.log("set ability on actionButton for " + ability.name);

		// set 

		this.setState({
			name: ability.name,
			actionicon: require('../../../../dist/assets/icons/' + ability.icon),
			abilityNo: ability.number,
			refno: ability.refno,
			keycode : ability.keycode
		});

		console.log("button keycode2: " + ability.keycode);
		console.log("button keycode3: " + String.fromCharCode(ability.keycode));

		/*
		ability['name'] = "warAbility1";
		ability['icon'] = "warAbility1.png";
		ability['number'] = 1;
		*/
	}

	triggerAction(isDown) {
		
		if(!isDown) { // on key goes up
			//console.log("TRIGGERING: " + this.state.name + " for being refno: " + this.state.refno);

			//this.onTriggerCooldown(1500);
			//this.setCooldownWidth(50);

		//$("#cooldown" + this.state.uniqueNo).css({"opacity": 0});

		// if off cooldown, use sockets to send request to server to use ability	

			//console.log("triggering " + this.state.abilityNo + " from refno: " + this.state.refno);
			window.abilityManager.triggerAbility(this.state.abilityNo, this.state.refno);
		} 	
	}

	onButtonClick() {
		this.triggerAction(false);
	}

	getRowNo() {
		return this.props.row;
	}

	getColNo() {
		return this.props.col;
	}

	onReceiveActionProps() {

	}

	/*
	      	<div style={{
	        position: 'absolute',
	        width: this.state.size + 'px',
	        height: this.state.size + 'px',
	        bottom: this.state.yMargin + 'px',
	        left: this.state.xMargin + (this.state.xDist + this.state.size) * this.props.num + 'px' 
	    	}}>

		    	<img style={{
		    		position: 'absolute',
		    		width: '100%',
	            	height: '100%',
		    		top: '0',
	            	left: '0'
		    	}} />

		    	<p style={{
		            position: 'absolute',
		            top: '-2px',
		            left: '2px',
		            color: 'black',
		            fontSize: '18px',
		            fontWeight: 'bold'
	          	}}>1</p>

          </div>
          */


			/*
          
			*/


		// todo : give the button a grey border so it can flash white when pressed


	render() {
	    return (
	    	
          <div onClick={this.onButtonClick} style={{
          	position: 'absolute',
          	bottom: this.state.position + this.props.row * this.state.boxSize + 'px',
          	left: this.state.position + this.props.col * this.state.boxSize + 'px',
          	width: this.state.iconSize + 'px',
          	height: this.state.iconSize + 'px'
          }}>

          <img draggable="false" src={this.state.actionicon} style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: this.state.iconSize + 'px',
            height: this.state.iconSize + 'px',
            zIndex: '1'
          }}/>

          <div id={"cooldown" + this.state.uniqueNo} style={{
          	position: 'absolute',
          	background: 'black',
          	opacity: this.state.cooldownOpacity,
          	bottom: '0',
          	left: '0',
          	width: this.state.cooldownWidth,
            height: this.state.boxSize + 'px',
            zIndex: '2'
          }}> </div>

          <div id={"cooldowncover" + this.state.uniqueNo} style={{
          	position: 'absolute',
          	background: 'black',
          	opacity: '1',
          	bottom: '0',
          	left: '0',
          	width: '0%',
            height: this.state.boxSize + 'px',
            zIndex: '3'
          }}> </div>

           <p style={{ background: 'black',
          	opacity: 0.5, color: 'white', zIndex: '4', fontSize: '22', position: 'absolute', top: '0', left: '14' }}>{String.fromCharCode(this.state.keycode)}</p>

          </div>
	    );
	  }
}
