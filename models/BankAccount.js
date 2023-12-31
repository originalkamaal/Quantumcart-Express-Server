// bankAccountModel.js
const { Schema, model } = require('mongoose');

const bankAccountSchema = new Schema({
    cancelledCheckPhotoUrl: String,
    bankName: String,
    ifscCode: String,
    accountNumber: String,
    bankAccountVerified: String, // You may want to use VerificationStatusType here
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const BankAccount = model('BankAccount', bankAccountSchema);

module.exports = BankAccount;
