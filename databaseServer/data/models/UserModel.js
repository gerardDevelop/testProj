const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email:  { type: String, required: true},
  username: { type: String, required: true },
  password:   { type: String, required: true },
  rating: { type: Number, default: 1600 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  practiceGames: { type: Number, default: 0 },
  parties: [{ 
    "lookupId": String
  }],
  date: { type: Date, default: Date.now }
});

module.exports = User = mongoose.model('users', UserSchema);