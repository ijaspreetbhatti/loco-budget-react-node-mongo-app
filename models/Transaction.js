const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionCategoryList = [
    'entertainment',
    'rent',
    'utilities',
    'groceries',
    'misc',
    'salary',
    'income'
];

const TransactionSchema = new Schema({
    name: { type: String, required: true, maxLength: 40 },
    category: { type: String, required: true, enum: TransactionCategoryList, default: TransactionCategoryList[0] },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['income', 'expenses'], default: 'expenses' },
    date: { type: Date, required: true, default: (new Date()).toISOString() }
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;