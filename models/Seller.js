// sellerModel.js
const { Schema, model } = require('mongoose');

const sellerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
  displayName: String,
  businessName: String,
  businessDescription: String,
  signaturePhotoUrl: String,
  panNumber: String,
  panNumberVerified: String,
  signatureVerified: String,
  primaryBankAccount: { type: Schema.Types.ObjectId, ref: 'BankAccount' },
  primaryAddress: { type: Schema.Types.ObjectId, ref: 'Address' },
  bankAccounts: [{ type: Schema.Types.ObjectId, ref: 'BankAccount' }],
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  GSTIN: [{ type: Schema.Types.ObjectId, ref: 'GSTIN' }],
});

const Seller = model('Seller', sellerSchema);

module.exports = Seller;
