const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
    name: { type: String, required: true, maxLength: 40 },
});

const Budget = mongoose.model("Budget", BudgetSchema);

module.exports = Budget;