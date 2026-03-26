const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['add', 'deduct'] },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  adminNote: { type: String }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
