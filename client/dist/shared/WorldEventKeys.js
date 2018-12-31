const WorldEventKeys = {	
	EVENT_TYPE: 't',

	BEING_NAME: 'n',
	BEING_REFNO: 'rn',
	BEING_POSITION_X: 'px',
	BEING_POSITION_Y: 'py',
	BEING_HEALTH: 'h',
	BEING_MANA: 'm',

	BEING_BEINGTYPE: 'bt',
	BEING_BEINGCLASS: 'bc',
	BEING_USERNAME: 'u',
	BEING_TOTAL_HEALTH: 'th',
	BEING_TOTAL_MANA: 'tm',

	BEING_EFFECTS: 'be',
	EFFECT_ID: 'eid',
	EFFECT_NAME : 'enm', // used to lookup effect specifics
	EFFECT_TIME_LEFT: 'etl',

	TARGET_BEING: 'tb',
	DAMAGE: 'd',
	ABILITY_CODE: 'c',
	PROJECTILE_TYPE_CODE: 'pc',
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = WorldEventKeys;
else
	window.worldEventKeys = WorldEventKeys; 