const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionCategoryList = [
    'entertainment',
    'rent',
    'ultilities',
    'groceries',
    'misc'
];

const TransactionSchema = new Schema({
    name: { type: String, required: true, maxLength: 40 },
    category: { type: String, required: true, enum: TransactionCategoryList, default: TransactionCategoryList[0] },
    amount: { type: Number, required: true },
    type: { type: Number, required: true, enum: ['credit', 'debit'], default: 'credit' },
    date: { type: Date, required: true, default: Date.now }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;