const router = require('express').Router({ mergeParams: true });

const { getAllTransactions, getTransaction, createNewTransaction, updateTransaction } = require("../controllers/transaction.js")

const { transactionValidator } = require('../validators');

router.get('/', getAllTransactions);
router.get('/:transactionId', getTransaction);
router.post('/', transactionValidator, createNewTransaction);
router.patch('/:transactionId', transactionValidator, updateTransaction);

module.exports = router;