const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    name: { type: String, default: "Budget", maxLength: 40 },
    entertainment: { type: Number, default: 0 },
    rent: { type: Number, default: 0 },
    utilities: { type: Number, default: 0 },
    groceries: { type: Number, default: 0 },
    misc: { type: Number, default: 0 },
    income: { type: Number, default: 0 },
});

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;