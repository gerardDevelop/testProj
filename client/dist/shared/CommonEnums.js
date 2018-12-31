// not sure if this is needed

const commonEnums = {
	beingTypes : {
		MOB : 'n',
		FRIENDLY_NPC: 'f',
		CHARACTER: 'c',
		MINION: 'm'
	},

	characterAttackType : {
		'wr' : 'melee',
		'mg' : 'rangedMagic',
		'pr' : 'rangedMagic',
	},

	projectileTypes : {
		'STONE' : 's',
	},

	projectileSpeed : {
		'a' : 500, // arrow
		'f' : 300, // fireball
		's' : 350, // stone
	},

	abilityToInitType : {
		'w1' : 's',
		'w2' : 's',
		'w3' : 's',
		'w4' : 's',
		'w5' : 's',
		'w6' : 's',
		'w7' : 's',
		'w8' : 's',
		'w9' : 's',
		'w10' : 's',

		'm1' : 's',
		'm2' : 's',
		'm3' : 's',
		'm4' : 's',
		'm5' : 's',
		'm6' : 's',
		'm7' : 's',
		'm8' : 's',
		'm9' : 's',
		'm10' : 's',

		'p1' : 's',
		'p2' : 's',
		'p3' : 's',
		'p4' : 's',
		'p5' : 's',
		'p6' : 's',
		'p7' : 's',
		'p8' : 's',
		'p9' : 's',
		'p10' : 's',
	},

	abilityToExecutionType : {
		'w1' : 'i',
		'w2' : 'i',
		'w3' : 'i',
		'w4' : 'i',
		'w5' : 'i',
		'w6' : 'i',
		'w7' : 'i',
		'w8' : 'i',
		'w9' : 'i',
		'w10' : 'i',

		'm1' : 'c',
		'm2' : 'c',
		'm3' : 'c',
		'm4' : 'i',
		'm5' : 'i',
		'm6' : 'i',
		'm7' : 'i',
		'm8' : 'i',
		'm9' : 'i',
		'm10' : 'i',

		'p1' : 'c',
		'p2' : 'i',
		'p3' : 'i',
		'p4' : 'i',
		'p5' : 'i',
		'p6' : 'i',
		'p7' : 'i',
		'p8' : 'i',
		'p9' : 'i',
		'p10' : 'i',
	},

	globalCooldownLength : 1500
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = commonEnums;
else
	window.commonEnums = commonEnums;