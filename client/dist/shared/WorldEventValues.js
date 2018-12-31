const WorldEventValues = {	
	EVENT_TYPE: 't',

	BEING_NAME: 'n',
	BEING_REFNO: 'rn',
	BEING_POSITION_X: 'px',
	BEING_POSITION_Y: 'py',
	BEING_HEALTH: 'h',
	BEING_MANA: 'm',
	BEING_BEINGTYPE: 'bt',
	BEING_USERNAME: 'u',
	BEING_TOTAL_HEALTH: 'th',
	BEING_TOTAL_MANA: 'tm',

	BEING_EFFECTS: 'be',

	EFFECT_ID: 'eid',
	EFFECT_NAME : 'enm', // used to lookup effect specifics
	EFFECT_TIME_LEFT: 'etl',

	'WARRIOR1' : 'w1',
	'WARRIOR2' : 'w2',
	'WARRIOR3' : 'w3',
	'WARRIOR4' : 'w4',
	'WARRIOR5' : 'w5',
	'WARRIOR6' : 'w6',
	'WARRIOR7' : 'w7',
	'WARRIOR8' : 'w8',
	'WARRIOR9' : 'w9',
	'WARRIOR10': 'w10',

	'MAGE1' : 'm1',
	'MAGE2' : 'm2',
	'MAGE3' : 'm3',
	'MAGE4' : 'm4',
	'MAGE5' : 'm5',
	'MAGE6' : 'm6',
	'MAGE7' : 'm7',
	'MAGE8' : 'm8',
	'MAGE9' : 'm9',
	'MAGE10': 'm10',

	'PRIEST1' : 'p1',
	'PRIEST2' : 'p2',
	'PRIEST3' : 'p3',
	'PRIEST4' : 'p4',
	'PRIEST5' : 'p5',
	'PRIEST6' : 'p6',
	'PRIEST7' : 'p7',
	'PRIEST8' : 'p8',
	'PRIEST9' : 'p9',
	'PRIEST10': 'p10',	
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = WorldEventValues;
else
	window.worldEventValues = WorldEventValues; 