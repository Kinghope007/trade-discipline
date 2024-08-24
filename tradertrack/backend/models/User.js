const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String,
    required: true },
  email: { type: String,
    required: true,
    unique: true,
    index: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
  password: { type: String,
    required: true },
});

module.exports = mongoose.model('User', UserSchema);
