import React, { Component } from 'react';

export default class MainUI extends Component {

	constructor() {
		super();
		this.onButtonClick = this.onButtonClick.bind(this);
	}

	onButtonClick(e) {
		console.log("button clicked!");
		e.stopPropagation();
    	//e.nativeEvent.stopImmediatePropagation();
	}

	render() {
	    return (
	      <div className="MainUI">
	      	<button onMouseUp={this.onButtonClick}>Ui component</button>
	      </div>
	    )
	  }
}
