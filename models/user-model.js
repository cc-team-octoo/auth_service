const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  // email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
  },
  admin: Boolean
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;