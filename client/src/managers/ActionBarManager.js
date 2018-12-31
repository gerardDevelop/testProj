class ActionBarManager {
	constructor() {
		const registerActionButton = (row, col, button) => {
			window.actionRows[row][col] = button;
		}

		window.registerActionButton = registerActionButton;
	}	

	init() {


		this.setupAbilities();



		// set the action buttons of the bars
		//var button = window.actionRows[0][0];

		/*button.setAbilityProps({

		});*/

		// get being 1
		//var char1 = window.user.myChars[0];
		
		// set the button's being

		/*

		var num = col.getRowNo();
        var character = window.ownedCharacters[num];
        var ability = getAbility(character.kind, col.getColNo());
        ability.refno = character.refno;
        col.setAbilityProps(ability);	

		*/

		// set bar 1
			// set button 1
			// set button 2
			// set button 3
			// set button 4
			// set button 5

		// get char 2

		// set bar 2
			// set button 1
			// set button 2
			// set button 3
			// set button 4
			// set button 5

	}

	RowToNum(charNum) {
		if(charNum === 0) {
			return 1;
		} return 0;
	}

	setupAbilities() {
		var rows = Object.values(window.actionRows);

		window.actionRowsByRefno = {};

		//rows.forEach((row, rowIndex) => {

		//for(var i = rows.length-1; i > -1; i--) {

		for(var i = 0; i < rows.length; i++) {	

		  console.log("ITERATING ROW");

		  console.log("i: " + i);

		  var num = this.RowToNum(i);
		  var character = window.user.myChars[num];
		  console.log('REFNO: ' + character.refno);
          console.log("NAME: " + character.name);

		  window.actionRowsByRefno[character.refno] = {}; 

          Object.values(rows[i]).forEach((col, colIndex) => {
            
            console.log("num = " + num);
            
            var ability = this.getAbility(character.beingClass, colIndex);
            ability.refno = character.refno;
            ability.keycode = this.getColKeycode(colIndex, num);
            console.log("keycode1: " + ability.keycode);

            col.setAbilityProps(ability);

            console.log("CREATING ACTION ROW BUTTON FOR " + character.refno + " and abilityCode: " + 
            	ability.number);

           	window.actionRowsByRefno[character.refno][ability.number] = col;
           	window.actionRowsByRefno[character.refno][ability.number].onExecution(); 

           	//console.log("buttons length for this character: " + 
				//Object.values(window.actionRowsByRefno[character.refno]).length);
           //	col.onExecution();
          }); 
        }
	}	

	getColKeycode(col, row) {
		console.log("col: " + col + " row: " + row);

		switch(row) {
			case 0: {
				if(col === 0) {
					return 81;
				} else if(col === 1) {
					return 87;	
				} else if(col === 2) {
					return 69;
				} else if(col === 3) {
					return 82;
				} else if(col === 4) {
					return 84;
				}
			} break; 

			case 1: {
				if(col === 0) {
					return 65;
				} else if(col === 1) {
					return 83;
				} else if(col === 2) {
					return 68;
				} else if(col === 3) {
					return 70;
				} else if(col === 4) {
					return 71;
				}
			} break;
		}
	}

	getAbility(kind, col) {
			
			/*

			CHARACTER_TYPE_WARRIOR: 'wr',
			CHARACTER_TYPE_MAGE: 'mg',
			CHARACTER_TYPE_PRIEST: 'pr',

			*/

			console.log("KIND:" + kind);

			var ability = {
				//receives a refno at least
				//name of ability picture
				//name of ability
				//ability number
				//ability keystroke
				//current cooldown

				// each actionbutton should give a reference to the action execution method
				// contained in each actionbutton
			};

			switch(kind) {
				case window.messageValues.CHARACTER_TYPE_WARRIOR: {
					if(col == 0) {
						ability['name'] = "warAbility1";
						ability['abilityCode'] = 'w1';
						ability['icon'] = "warrior1.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior1;

					} else if(col == 1) {
						ability['name'] = "warAbility2";
						ability['abilityCode'] = 'w2';
						ability['icon'] = "warrior2.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior2;
					} else if(col == 2) {
						ability['name'] = "warAbility3";
						ability['abilityCode'] = 'w3';
						ability['icon'] = "warrior3.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior3;
					} else if(col == 3) {
						ability['name'] = "warAbility4";
						ability['abilityCode'] = 'w4';
						ability['icon'] = "warrior4.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior4;
					} else if(col == 4) {
						ability['name'] = "warAbility5";
						ability['abilityCode'] = 'w5';
						ability['icon'] = "warrior5.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior5;
					}
				}
						break;
				case window.messageValues.CHARACTER_TYPE_MAGE: {
					if(col == 0) {
						ability['name'] = "mageAbility1";
						ability['abilityCode'] = 'm1';	
						ability['icon'] = "mage1.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage1;
					} else if(col == 1) {
						ability['name'] = "mageAbility2";
						ability['abilityCode'] = 'm2';	
						ability['icon'] = "mage2.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage2;
					} else if(col == 2) {
						ability['name'] = "mageAbility3";
						ability['abilityCode'] = 'm3';	
						ability['icon'] = "mage3.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage3;
					} else if(col == 3) {
						ability['name'] = "mageAbility4";
						ability['abilityCode'] = 'm4';	
						ability['icon'] = "mage4.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage4;
					} else if(col == 4) {
						ability['name'] = "mageAbility5";
						ability['abilityCode'] = 'm5';	
						ability['icon'] = "mage5.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage5;
					}
				}
						break;
				case window.messageValues.CHARACTER_TYPE_PRIEST: {
					console.log("in priest");

					if(col == 0) {
						ability['name'] = "priestAbility1";
						ability['abilityCode'] = 'p1';	
						ability['icon'] = "priest1.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest1;
					} else if(col == 1) {
						ability['name'] = "priestAbility2";
						ability['abilityCode'] = 'p2';	
						ability['icon'] = "priest2.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest2;
					} else if(col == 2) {
						ability['name'] = "priestAbility3";
						ability['abilityCode'] = 'p3';	
						ability['icon'] = "priest3.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest3;
					} else if(col == 3) {
						ability['name'] = "priestAbility4";
						ability['abilityCode'] = 'p4';	
						ability['icon'] = "priest4.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest4;
					} else if(col == 4) {
						ability['name'] = "priestAbility5";
						ability['abilityCode'] = 'p5';	
						ability['icon'] = "priest5.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest5;
					}
				}
					break;
				default: return null;
			}

			return ability;
	}		
}

export default ActionBarManager;