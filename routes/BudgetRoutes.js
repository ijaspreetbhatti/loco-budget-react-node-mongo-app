const router = require('express').Router({ mergeParams: true });

const { getAllBudgets, getBudget, saveBudget, updateBudget, deleteBudget } = require("../controllers/budget.js")

const { budgetValidator } = require("../validators.js");

router.get('/', getAllBudgets);
router.get('/:budgetId', getBudget);
router.post('/', budgetValidator, saveBudget);
router.put('/:budgetId', budgetValidator, updateBudget);
router.delete('/:budgetId', deleteBudget);

module.exports = router;