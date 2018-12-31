import React, { Component } from 'react';
import ActionButton from './ActionButton';

/* 

Houses a number of action buttons, separated into rows for each character

*/

export default class ActionBar extends Component {

	constructor() {
		super();

		// window object should have references to each button

	}

	createTable()  {


		// only need one line now, perhaps 2,3 lines as more abilities are created..?

		// but for now, just one line (4-5 abilities)

	    let table = []

	    var incr = 1;

	    // Outer loop to create parent
	    for (let i = 1; i > -1; i--) {
	      let children = []
	      //Inner loop to create children
	      for (let j = 0; j < 5; j++) {
	        children.push(<td key={incr}><ActionButton row={i} col={j}/></td>)
	        incr++;
	      }

	      table.push(<tr key={i + 1}>{children}</tr>) 

	    }
	    return table
  	}

	render() {

	    return (
	      <div id="actionbar">
	      <table>
	      		<tbody>
	      			{this.createTable()}
	      		</tbody>
	      </table>
	      </div>
	    )
	  }
}
