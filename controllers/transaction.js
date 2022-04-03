const Transaction = require("../models/Transaction.js");

const getAllTransactions = (req, res) => {
    Transaction.find().skip(req.query.page * req.query.count).limit(req.query.count).exec()
        .then((results) => res.status(200).json(results))
        .catch((error) => res.status(500).send(error));
};

const getTransaction = (req, res, next) => {
    Transaction.findOne({ _id: req.params.transactionId }).exec()
        .then((results) => {
            res.json(results);
        })
        .catch((error) => res.status(500).json(error));
}

const createNewTransaction = (req, res) => {
    let newTransaction = new Transaction(req.locals.transaction);
    newTransaction.save()
        .then((result) => {
            const url = `/api/v1/transaction/${newTransaction._id}`;
            res.set('content-location', url).status(201).json({
                url,
                data: newCharacter.toObject()
            });
        })
        .catch((error) => res.status(500).send(error));
};

const updateTransaction = (req, res) => {

};

module.exports = {
    getAllTransactions,
    getTransaction,
    createNewTransaction,
    updateTransaction
};