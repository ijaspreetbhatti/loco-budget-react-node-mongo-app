const router = require('express').Router({ mergeParams: true });

const { getAllTransactions, getTransaction, createNewTransaction, updateTransaction, deleteTransaction, getTransactionsAggregateForMonth } = require("../controllers/transaction.js")

const { transactionValidator } = require('../validators');

router.get('/', getAllTransactions);
router.get('/:transactionId', getTransaction);
router.post('/', transactionValidator, createNewTransaction);
router.put('/:transactionId', transactionValidator, updateTransaction);
router.delete('/:transactionId', deleteTransaction);

router.get('/:year/:month', getTransactionsAggregateForMonth);

module.exports = router;