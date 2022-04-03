const Budget = require("../models/Budget.js");

const getAllBudgets = (req, res) => {
    Budget.find({}).exec()
        .then((results) => {
            res.json(results);
        })
        .catch((error) => res.status(500).json(error));
}

const getBudget = (req, res) => {
    Budget.findOne({ _id: req.params.budgetId }).exec()
        .then((results) => {
            res.json(results);
        })
        .catch((error) => res.status(500).json(error));
}

const saveBudget = (req, res) => {
    if (res.locals.validationErrors && res.locals.validationErrors.length > 0) {
        res.status(422).json(res.locals.validationErrors);
    } else {
        let newBudget = new Budget({
            name: req.body.name,
            entertainment: req.body.entertainment,
            rent: req.body.rent,
            utilities: req.body.utilities,
            groceries: req.body.groceries,
            misc: req.body.misc,
            income: req.body.income,
        });
        newBudget.save()
            .then((result) => {
                res.status(201).json(newBudget.toObject());
            })
            .catch((error) => res.status(500).send(error));
    }
};

const updateBudget = (req, res) => {
    if (res.locals.validationErrors && res.locals.validationErrors.length > 0) {
        res.status(422).json(res.locals.validationErrors);
    } else {
        let newBudget = {
            name: req.body.name,
            entertainment: req.body.entertainment,
            rent: req.body.rent,
            utilities: req.body.utilities,
            groceries: req.body.groceries,
            misc: req.body.misc,
            income: req.body.income,
        };
        Budget.updateOne({
            _id: req.params.budgetId,
        }, newBudget, (err, r) => {
            if (err) {
                res.status(422).json(err);
            } else {
                res.status(200).json(r);
            }
        });
    }
};

const deleteBudget = (req, res) => {
    Budget.deleteOne({
        _id: req.params.budgetId,
    }, (err, r) => {
        if (err) {
            res.status(422).json(err);
        } else {
            res.status(200).json(r);
        }
    });
};

module.exports = {
    getAllBudgets,
    getBudget,
    saveBudget,
    updateBudget,
    deleteBudget
};