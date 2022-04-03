const Transaction = require("../models/Transaction.js");

const getAllTransactions = (req, res) => {
    Transaction.find().sort({ date: 'desc' }).skip(req.query.page * req.query.count).limit(req.query.count).exec()
        .then((results) => {
            Transaction.count({})
                .then((response) => {
                    res.status(200).json({ list: results, totalTransactions: response })
                })
                .catch((error) => res.status(500).send(error));
        })
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
    if (res.locals.validationErrors && res.locals.validationErrors.length > 0) {
        res.status(422).json(res.locals.validationErrors);
    } else {
        let newTransaction = new Transaction({
            name: req.body.name,
            category: req.body.category,
            amount: req.body.amount,
            type: req.body.type,
            date: req.body.date
        });
        newTransaction.save()
            .then((result) => {
                const url = `/api/v1/transaction/${newTransaction._id}`;
                console.log(`Transaction created at ${url}`);
                res.set('content-location', url).status(201).json({
                    url,
                    data: newTransaction.toObject()
                });
            })
            .catch((error) => res.status(500).send(error));
    }
};

const updateTransaction = (req, res) => {
    if (res.locals.validationErrors && res.locals.validationErrors.length > 0) {
        res.status(422).json(res.locals.validationErrors);
    } else {
        const newTransaction = {
            name: req.body.name,
            category: req.body.category,
            amount: req.body.amount,
            type: req.body.type,
            date: req.body.date
        };
        Transaction.updateOne({
            _id: req.params.transactionId,
        }, newTransaction, (err, r) => {
            if (err) {
                res.status(422).json(err);
            } else {
                res.status(200).json(r);
            }
        });
    }
};

const deleteTransaction = (req, res) => {
    Transaction.deleteOne({
        _id: req.params.transactionId,
    }, (err, r) => {
        if (err) {
            res.status(422).json(err);
        } else {
            res.status(200).json(r);
        }
    });
};

module.exports = {
    getAllTransactions,
    getTransaction,
    createNewTransaction,
    updateTransaction,
    deleteTransaction
};