const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, default: '' },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    description: { type: String, default: '' },
    avatar: { type: String, default: '' },
    background: { type: String, default: '' },
    theme: { type: String, default: 'light' }
});

module.exports = mongoose.model('User', UserSchema);
