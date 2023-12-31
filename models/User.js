// userModel.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  userType: { type: String, enum: ['Seller', 'Customer', 'Employee', 'Admin', 'Vendor'] },
  password: String,
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = model('User', userSchema);

module.exports = User;
