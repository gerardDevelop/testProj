import Enums from '../Common/Enums';
/*

Common functions called by react components, housed in the window object
// almost all socket.emit events should occur here, as well as references to window enum properties,
// to make refactoring easier

 */

class CommonFunctions {

	constructor(socket) {

		window.enums = new Enums();

		const onLookForRankedMatch = () => {
			socket.emit('rankedmatch');
		}

		window.onLookForRankedMatch = onLookForRankedMatch;

		const onLookForPracticeMatch = () => {
			socket.emit('practicematch');
		}

		window.onLookForPracticeMatch = onLookForPracticeMatch;

		//const OnTestRun = (charChoice1, charChoice2) => {
		const OnTestRun = () => {
			// make message object, then set the keys on it
			const dataObj = {};
			dataObj[window.messageKeys.WORLD_NAME] = 'test';
			
			const being1Obj = {};
			being1Obj[window.messageKeys.CHARACTER_NAME] = 'CharacterName1';
			being1Obj[window.messageKeys.CHARACTER_TYPE] = window.messageValues.CHARACTER_TYPE_WARRIOR;

			const being2Obj = {};
			being2Obj[window.messageKeys.CHARACTER_NAME] = 'CharacterName2';
			being2Obj[window.messageKeys.CHARACTER_TYPE] = window.messageValues.CHARACTER_TYPE_PRIEST;

			var charArray = [
				being1Obj, being2Obj
			];

			dataObj[window.messageKeys.MY_CHARACTERS_ARRAY] = charArray;

			console.log("sending test run message to server");

			socket.emit(window.clientCodes.TEST_RUN_REQUEST, dataObj);
		}

		window.OnTestRun = OnTestRun;

		// receive user object from server
		const onReceiveLogin = username => {
			window.lookingForMatch = false;
			window.lookingForMatchElapsedTime = 0;

			window.username = username;
			//window.rating = user.rating;
			//window.wins = user.wins;
			//window.losses = user.losses;
			//window.practiceGames = user.practiceGames;
		}

		window.onReceiveLogin = onReceiveLogin;

		window.Login = (username, password) => {
	    	console.log("calling login");

	    	var data = {};

	    	data[window.messageKeys.USERNAME] = username;
	    	data[window.messageKeys.PASSWORD] = password;

		    socket.emit(window.clientCodes.LOGIN_REQUEST, data);
		}

		window.Register = (username, email, password) => {
		    console.log("calling register");

		    var data = {};

		    data[window.messageKeys.USERNAME] = username;
		    data[window.messageKeys.PASSWORD] = password;
		    data[window.messageKeys.EMAIL] = email;

		    socket.emit(window.clientCodes.REGISTRATION_REQUEST, data);
		}

		const GetParties = () => {
		    console.log("getting parties");

		    socket.emit('get parties');
		}

		window.GetParties = GetParties;

		const CreateParty = () => {
		    console.log("creating party");

		    socket.emit('create party', {});
		}

		window.CreateParty = CreateParty;

		const QuickTest = number => {

		}

		window.QuickTest = QuickTest;

		const EnterWorld = (char1, char2, char3) => {
		    console.log("entering world");

		    socket.emit('enter world', {
		        characters : [char1, char2, char3]
		    });
		}

		window.EnterWorld = EnterWorld;

		const getAbility = (characterType, col) => {
			
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

			switch(characterType) {
				case "warrior": 
					if(col == 0) {
						ability['name'] = "warAbility1";
						ability['icon'] = "warrior1.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior1;

					} else if(col == 1) {
						ability['name'] = "warAbility2";
						ability['icon'] = "warrior2.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior2;
					} else if(col == 2) {
						ability['name'] = "warAbility3";
						ability['icon'] = "warrior3.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior3;
					} else if(col == 3) {
						ability['name'] = "warAbility4";
						ability['icon'] = "warrior4.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior4;
					} else if(col == 4) {
						ability['name'] = "warAbility5";
						ability['icon'] = "warrior5.jpg";
						ability['number'] = window.enums.AbilityNumbers.warrior5;
					}
						break;
				case "mage": 
					if(col == 0) {
						ability['name'] = "mageAbility1";	
						ability['icon'] = "mage1.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage1;
					} else if(col == 1) {
						ability['name'] = "mageAbility2";
						ability['icon'] = "mage2.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage2;
					} else if(col == 2) {
						ability['name'] = "mageAbility3";
						ability['icon'] = "mage3.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage3;
					} else if(col == 3) {
						ability['name'] = "mageAbility4";
						ability['icon'] = "mage4.jpg";
						ability['number'] = window.nums.AbilityNumbers.mage4;
					} else if(col == 4) {
						ability['name'] = "mageAbility5";
						ability['icon'] = "mage5.jpg";
						ability['number'] = window.enums.AbilityNumbers.mage5;
					}
						break;
				case "priest": 
					if(col == 0) {
						ability['name'] = "priestAbility1";
						ability['icon'] = "priest1.jpg";
						ability['number'] = window.nums.AbilityNumbers.priest1;
					} else if(col == 1) {
						ability['name'] = "priestAbility2";
						ability['icon'] = "priest2.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest2;
					} else if(col == 2) {
						ability['name'] = "priestAbility3";
						ability['icon'] = "priest3.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest3;
					} else if(col == 3) {
						ability['name'] = "priestAbility4";
						ability['icon'] = "priest4.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest4;
					} else if(col == 4) {
						ability['name'] = "priestAbility5";
						ability['icon'] = "priest5.jpg";
						ability['number'] = window.enums.AbilityNumbers.priest5;
					}
						break;
				default: return null;
			}

			return ability;
		}

		const actionRows = {
			0: { },
			1: { }
		};

		window.actionRows = actionRows;
 
		const registerActionButton = (row, col, button) => {
			window.actionRows[row][col] = button;
		}

		window.registerActionButton = registerActionButton;

		const setSpawnData = spawnData => {
    		
			window.charactersToSpawn = spawnData.characters;
			window.ownedCharacters = main.scene.keys["MainScene"].ownedCharacters;

    		/*	
    		// create character objects
    		for(var i = spawnData.characters.length - 1; i > -1; i--) {
    			//console.log("char: " + char.refno);
    			//main.scene.keys["MainScene"].spawnCharacter(spawnData.characters[i]);
    		}
    		*/		
    		/*
    		spawnData.characters.forEach(char => {
    			main.scene.keys["MainScene"].spawnCharacter(char);
    		});
    		*/
			
    		
    		/*
    		Object.values(actionRows).forEach(row => {
    			Object.values(row).forEach(col => {
    				var num = col.getRowNo();
    				var character = window.ownedCharacters[num];
    				var ability = getAbility(character.kind, col.getColNo());
    				ability.refno = character.refno;
    				col.setAbilityProps(ability);
    			});	
    		});
    		*/
		}		

		window.setSpawnData = setSpawnData;

		

		const sendMovePos = moveData => {
			socket.emit('movepos', moveData);	
		}

		window.sendMovePos = sendMovePos;	

		const sendTargetEnemy = targetData => {
			socket.emit('targetenemy', targetData);
		}

		window.sendTargetEnemy = sendTargetEnemy;

		const sendAbilityCast = abilityData => {
			socket.emit('castability', abilityData);
		}

		window.sendAbilityCast = sendAbilityCast;

		//const sendAttackTarget = function()
		
		const selectChar1 = (pressedDown) => {
			if(!pressedDown) {
				window.user.onSelectCharacter(0);
			}
		}

		const selectChar2 = (pressedDown) => {
			if(!pressedDown) {
				window.user.onSelectCharacter(1);
			}
		}
		/*
		const selectChar3 = () => {
			main.scene.keys["MainScene"].keySelectCharacter(3);
		}
		
		const selectAllChars = () => {
			main.scene.keys["MainScene"].keySelectAll();
		}
		*/
		const char1action1 = (isDown) => {
			console.log("char1action1");
			actionRows[0][0].triggerAction(isDown);
		};

		const char1action2 = (isDown) => {
			console.log("char1action2");
			actionRows[0][1].triggerAction(isDown);
		};

		const char1action3 = (isDown) => {
			console.log("char1action3");
			actionRows[0][2].triggerAction(isDown);
		};

		const char1action4 = (isDown) => {
			console.log("char1action4");
			actionRows[0][3].triggerAction(isDown);
		};

		const char1action5 = (isDown) => {
			console.log("char1action5");
			actionRows[0][4].triggerAction(isDown);
		};

		const char2action1 = (isDown) => {
			console.log("char2action1");
			actionRows[1][0].triggerAction(isDown);
		};

		const char2action2 = (isDown) => {
			console.log("char2action2");
			actionRows[1][1].triggerAction(isDown);
		};

		const char2action3 = (isDown) => {
			console.log("char2action3");
			actionRows[1][2].triggerAction(isDown);
		};

		const char2action4 = (isDown) => {
			console.log("char2action4");
			actionRows[1][3].triggerAction(isDown);
		};

		const char2action5 = (isDown) => {
			console.log("char2action5");
			actionRows[1][4].triggerAction(isDown);
		};
		/*
		const char3action1 = () => {
			console.log("char3action1");
			actionRows[2][0].triggerAction();
		};

		const char3action2 = () => {
			console.log("char3action2");
			actionRows[2][1].triggerAction();
		};

		const char3action3 = () => {
			console.log("char3action3");
			actionRows[2][2].triggerAction();
		};

		const char3action4 = () => {
			console.log("char3action4");
			actionRows[2][3].triggerAction();
		};

		const char3action5 = () => {
			console.log("char1action5");
			actionRows[2][4].triggerAction();
		};
		*/

		var keysDown = {
			up: false,
			down: false,
			left: false,
			right: false
		}

		window.keysDown = keysDown;

		const moveUp = (isDown) => {
			if(isDown) { 
				if(keysDown['up'] == false) {
					window.keysDown['up'] = true;
					main.scene.keys["MainScene"].onButtonDown('up');
				}
			} else {
				window.keysDown['up'] = false;
				main.scene.keys["MainScene"].onButtonUp('up')
			}
		};

		const moveDown = (isDown) => {
			isDown ? main.scene.keys["MainScene"].onButtonDown('down') : main.scene.keys["MainScene"].onButtonUp('down')
		};

		const moveRight = (isDown) => {
			isDown ? main.scene.keys["MainScene"].onButtonDown('right') : main.scene.keys["MainScene"].onButtonUp('right')
		};

		const moveLeft = (isDown) => {
			isDown ? main.scene.keys["MainScene"].onButtonDown('left') : main.scene.keys["MainScene"].onButtonUp('left')
		};

		const executeAbility = (number) => {
			console.log("calling executeAbility");
			socket.emit('executeability', {
				x: window.mouseWorldX,
				y: window.mouseWorldY,
				a: number
			});
		}

		const action1 = (isDown) => {
			//isDown ? main.scene.keys["MainScene"].onButtonDown('action1') : main.scene.keys["MainScene"].onButtonUp('action1')
			// emit message to server

			// should send mouse x,y coords of mouse as well as ability
			// inside a js objects
			
			isDown ? null : executeAbility(1);
		}

		const action2 = (isDown) => {
			//isDown ? main.scene.keys["MainScene"].onButtonDown('action2') : main.scene.keys["MainScene"].onButtonUp('action2')
			isDown ? null : executeAbility(2);
		}

		const action3 = (isDown) => {
			//isDown ? main.scene.keys["MainScene"].onButtonDown('action3') : main.scene.keys["MainScene"].onButtonUp('action3')
			isDown ? null : executeAbility(3);
		}

		const action4 = (isDown) => {
			//isDown ? main.scene.keys["MainScene"].onButtonDown('action4') : main.scene.keys["MainScene"].onButtonUp('action4')
			isDown ? null : executeAbility(4);
		}

		const action5 = (isDown) => {
			//isDown ? main.scene.keys["MainScene"].onButtonDown('action4') : main.scene.keys["MainScene"].onButtonUp('action4')
			isDown ? null : executeAbility(5);
		}

		var setkeys = {
			
			selectChar3: null, //49,
			selectChar2: 50,//50,
			selectChar1: 49,//51,
			//selectAllChars: null, //52,

			char1action1: 65,//81,
			char1action2: 83,//87,
			char1action3: 68,//69,
			char1action4: 70,//82,
			char1action5: 71,//84,
			char2action1: 81,//65,
			char2action2: 87,//83,
			char2action3: 69,//68,
			char2action4: 82,//83,
			char2action5: 84,//68,

			/*
			char1action1: null,//70,
			char1action2: null,//71,
			char1action3: null,//90,
			char1action4: null,//88,
			char1action5: null,//66
			*/
			//moveUp: 87,
			//moveLeft: 65,
			//moveDown: 83,
			//moveRight: 68,
			//action1: 49,
			//action2: 50,
			//action3: 51,
			//action4: 52,
			//action5: 53,


		};

		window.setkeys = setkeys;

		var keybinds = {};
		
			//keybinds[window.setkeys.selectChar3] = selectChar3;	//49
			keybinds[window.setkeys.selectChar2] = selectChar2;	//50
			keybinds[window.setkeys.selectChar1] = selectChar1;	//51
			//keybinds[window.setkeys.selectAllChars] = selectAllChars; //52
			
			/*
			keybinds[window.setkeys.char3action1] = char3action1;   //81
			keybinds[window.setkeys.char3action2] = char3action2;   //87
			keybinds[window.setkeys.char3action3] = char3action3;   //69
			keybinds[window.setkeys.char3action4] = char3action4;   //82
			keybinds[window.setkeys.char3action5] = char3action5;   //84
			*/
			keybinds[window.setkeys.char2action1] = char2action1;   //65
			keybinds[window.setkeys.char2action2] = char2action2;   //83
			keybinds[window.setkeys.char2action3] = char2action3;   //68
			keybinds[window.setkeys.char2action4] = char2action4;   //70
			keybinds[window.setkeys.char2action5] = char2action5;   //71
			keybinds[window.setkeys.char1action1] = char1action1;   //90
			keybinds[window.setkeys.char1action2] = char1action2;   //88
			keybinds[window.setkeys.char1action3] = char1action3;   //67
			keybinds[window.setkeys.char1action4] = char1action4;   //86
			keybinds[window.setkeys.char1action5] = char1action5;    //66
			
			//keybinds[window.setkeys.moveUp] = moveUp;
			//keybinds[window.setkeys.moveLeft] = moveLeft;
			//keybinds[window.setkeys.moveDown] = moveDown;
			//keybinds[window.setkeys.moveRight] = moveRight;
			keybinds[window.setkeys.action1] = action1;
			keybinds[window.setkeys.action2] = action2;
			keybinds[window.setkeys.action3] = action3;
			keybinds[window.setkeys.action4] = action4;
			keybinds[window.setkeys.action5] = action5;

		window.keybinds = keybinds;

		window.initActionButton = (row, col) => {
			// find the char that corresponds to the row
			// find the ability that corresponds to col

			// row 0 = char 1 
			// row 1 = char 2
			// row 2 = char 3
		}		
	}
}

export default CommonFunctions;