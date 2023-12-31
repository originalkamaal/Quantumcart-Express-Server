// gstinModel.js
const { Schema, model } = require('mongoose');

const gstinSchema = new Schema({
  gstinNumber: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  addressType: { type: String, default: 'Seller' }, // You may want to use GSTAddressType here
  displayName: String,
  street: String,
  city: String,
  state: String,
  pincode: String,
  verified: String, // You may want to use VerificationStatusType here
});

const GSTIN = model('GSTIN', gstinSchema);

module.exports = GSTIN;
