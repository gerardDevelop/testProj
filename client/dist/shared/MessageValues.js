const messageValues = {
	CHARACTER_TYPE_WARRIOR: 'wr',
	CHARACTER_TYPE_MAGE: 'mg',
	CHARACTER_TYPE_PRIEST: 'pr',
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = messageValues;
else
	window.messageValues = messageValues;