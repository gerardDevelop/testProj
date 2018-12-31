const worldEventCodes = {
	
	// ability cast
	ABILITY_CAST: 'ac',

	// for auto attacks
	ATTACK : 'at',

	// instant ability execution
	INSTANT_OFFENSIVE_ABILITY_EXECUTION : 'ie',

	// start casting
	START_SIMPLE_CASTING : 'sc',

	// x,y casting
	START_LOCATION_CASTING : 'slc',

	// stop casting
	STOP_CASTING : 'stc',

	// projectile spawn
	FIRE_PROJECTILE: 'ps',

	// projectile removal
	REMOVE_PROJECTILE: 'pr',

	// buff/debuff/dot etc
	SPAWN_EFFECT: 'pe',

	//remove effect
	REMOVE_EFFECT: 're',

	// being stat change (stat update example now being has 25 strength, or 1024 total health)
	BEING_CHANGE_STAT: 'cbs',

	// being change position? (not sure if needed)
	BEING_CHANGE_POSITION: 'cbp',

	// being new destination
	BEING_CHANGE_DESTINATION: 'cpd',

	// being finish moving event
	BEING_FINISH_MOVING_EVENT: 'bfm',

	// being select new target
	BEING_CHANGE_TARGET: 'bat',

	// being spawn
	BEING_SPAWN: 'bs',

	// being leave
	BEING_REMOVE: 'br',

	//being death
	BEING_DEATH: 'bd',

	//being revive
	BEING_REVIVE: 'br',
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = worldEventCodes;
else
	window.worldEventCodes = worldEventCodes;