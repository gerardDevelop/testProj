const CLIENT_CODES = {

	// pre world
	LOGIN_REQUEST: 'lr',
	LOGIN_RESPONSE_SUCCESS: 'lrs',
	LOGIN_RESPONSE_FAILURE: 'lrf',

	REGISTRATION_REQUEST: 'rr',
	REGISTRATION_RESPONSE_SUCCESS: 'rrs',
	REGISTRATION_RESPONSE_FAILURE: 'rrf',

	TEST_RUN_REQUEST: 'tr',
	
	ENTER_WORLD_REQUEST: 'ewr',
	LEAVE_WORLD_REQUEST: 'lwr',

	// in world specific
	MOVE_REQUEST: 'mr',
	TARGET_ENEMY_REQUEST: 'ta',
	DESELECT_ENEMY_REQUEST: 'de',
	ABILITY_REQUEST: 'ar',

};

export default CLIENT_CODES;