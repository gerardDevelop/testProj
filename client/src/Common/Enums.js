// changes to be made:

	// each aspect of the enums class is loaded as a series of objects when the client loads
	// these objects are available through the global window object
	// each class that wants access to these aspects (like eventtypes, etc) can define a const to the window subobject 
	// at the top of the class declaration

//	 DEPRECATED

class Enums {
	
	constructor() {

		// for all types of messages for now, to keep things simple
		this.MsgKeys = {
			ORGANISM_REF_NO: 'orf',
			ORGANISM_HEALTH: 'oh',
			ORGANISM_POSITION_X: 'ox',
			ORGANISM_POSITION_Y: 'oy',

			EVENT_TYPE: 'et',
			EVENT_DAMAGE_DONE: 'dd',
			EVENT_HEALING_DONE: 'hd',

			ABILITY_NO: 'an',

			EVENT_PROJECTILE_TYPE : 'pt',
			EVENT_PROJECTILE_POSITION_X: 'px',
			EVENT_PROJECTILE_POSITION_Y: 'py',
			EVENT_PROJECTILE_VECTOR_X: 'vx',
			EVENT_PROJECTILE_VECTOR_Y: 'vy',
		},

		this.EventTypes = {
			'MeleeAttackStart' : 1,
			'MeleeAttackHit' : 2,
			'RangedAttackStart' : 3,
			'RangedAttackHit' : 4,

			'InstantCast' : 5,
			'StartCasting' : 6,
			'SpawnProjectile' : 7,
			'RemoveProjectile' : 8, 
			'AbilityHit': 9,

			'AoeHit': 10,

			'ApplyDebuff' : 11,
			'ApplyBuff' : 12,
			'DebuffTick' : 13,
			'BuffTick' : 14,
			'DebuffFaded': 15,
			'BuffFaded': 16,
			'DebuffRemoved': 17,
			'BuffRemoved': 18,

			'AbilityStart': 19,

			'Death' : 1000,
			'MovementStopped' : 1001,
			'RangedAttackProjectile' : 1002, 

			'OnProjectileHit' : 1003
		},

		this.ProjectileTypes = {
			'MageBolt' : 1
		},

		this.AbilityNumbers = {
			'warrior1' : 'w1',
			'warrior2' : 'w2',
			'warrior3' : 'w3',
			'warrior4' : 'w4',
			'warrior5' : 'w5',
			'warrior6' : 'w6',
			'warrior7' : 'w7',
			'warrior8' : 'w8',
			'warrior9' : 'w9',
			'warrior10': 'w10',

			'mage1' : 'm1',
			'mage2' : 'm2',
			'mage3' : 'm3',
			'mage4' : 'm4',
			'mage5' : 'm5',
			'mage6' : 'm6',
			'mage7' : 'm7',
			'mage8' : 'm8',
			'mage9' : 'm9',
			'mage10': 'm10',

			'priest1' : 'p1',
			'priest2' : 'p2',
			'priest3' : 'p3',
			'priest4' : 'p4',
			'priest5' : 'p5',
			'priest6' : 'p6',
			'priest7' : 'p7',
			'priest8' : 'p8',
			'priest9' : 'p9',
			'priest10': 'p10',	
				
			}
		}
};

export default Enums;