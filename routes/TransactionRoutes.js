const router = require('express').Router({ mergeParams: true });

const { getAllTransactions, getTransaction, createNewTransaction, updateTransaction } = require("../controllers/transaction.js")

router.get('/', getAllTransactions);
router.get('/:transactionId', getTransaction);
router.post('/', createNewTransaction);
router.patch('/:transactionId', updateTransaction);

module.exports = router;