const messageKeys = {

	// database specific
	USERNAME: 'u',
	PASSWORD: 'p',
	PASSWORD2: 'p2',
	EMAIL: 'e',
	USER_SOCKET_ID: 's',

	BEING_REF_NO: 'r',
	BEING_HEALTH: 'h',
	BEING_MANA: 'm',
	X: 'x',
	Y: 'y',

	// for user sending enter world message
	WORLD_NAME: 'wn',
	WORLD_BLUEPRINT: 'wb',
	MY_CHARACTERS_ARRAY: 'ma',
	OTHER_BEINGS_ARRAY: 'oa',
	CHARACTER_NAME:	'bn',
	CHARACTER_TYPE: 'bt',

	TARGET_REF_NO: 'tr',

	ABILITY_CODE: 'ac',
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = messageKeys;
else
	window.messageKeys = messageKeys;