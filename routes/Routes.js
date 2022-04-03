const router = require('express').Router({ mergeParams: true });

const BudgetRoutes = require('./BudgetRoutes.js');
const TransactionRoutes = require('./TransactionRoutes.js');

router.use('/budget', BudgetRoutes);
router.use('/transaction', TransactionRoutes);

module.exports = router;