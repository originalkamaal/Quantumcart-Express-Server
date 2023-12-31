// addressModel.js
const { Schema, model } = require('mongoose');

const addressSchema = new Schema({
  street: String,
  city: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  addressProofPhotoUrl: String,
  addressProofVerified: String, // You may want to use VerificationStatusType here
  state: String,
  pincode: String,
  addressType: { type: String, default: 'Invoice' }, // You may want to use AddressType here
});

const Address = model('Address', addressSchema);

module.exports = Address;
