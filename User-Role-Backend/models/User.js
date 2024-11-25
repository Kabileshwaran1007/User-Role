const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
});

module.exports = mongoose.model('User ', userSchema);