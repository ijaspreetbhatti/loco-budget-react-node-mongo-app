const validator = require('validator');

const Ajv = require('ajv');
const ajv = new Ajv({
    allErrors: true,
    coerceTypes: true,
    useDefaults: 'empty'
});

require('ajv-errors')(ajv);
require('ajv-formats')(ajv);
require('ajv-keywords')(ajv);

const transactionValidator = (req, res, next) => {
    let schema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                maxLength: 40,
                transform: [
                    'trim'
                ],
                errorMessage: {
                    type: 'Name should be a string',
                    maxLength: 'Name of transaction can only contain 40 characters',
                }
            },
            category: {
                type: 'string',
                enum: [
                    'entertainment',
                    'rent',
                    'utilities',
                    'groceries',
                    'misc',
                    'salary',
                    'income'
                ],
                errorMessage: {
                    enum: 'Invalid Transaction Category!',
                }
            },
            amount: {
                type: 'number',
                minimum: 0.01,
                default: 0.01,
                errorMessage: {
                    minimum: 'Amount should be greater than 0.01',
                    type: 'Amount should be a Number.'
                }
            },
            type: {
                type: 'string',
                transform: [
                    'trim'
                ],
                enum: [
                    'income',
                    'expenses',
                ],
                errorMessage: {
                    enum: 'Invalid Transaction Type!',
                }
            },
            date: {
                type: 'string',
                format: 'date-time',
                minLength: 1,
                transform: [
                    'trim'
                ],
                errorMessage: {
                    format: 'Invalid date format: Should be ISO format!',
                    type: 'Invalid date!',
                }
            },
        },
        required: [
            'name',
            'category',
            'amount',
            'type',
            'date',
        ],
        additionalProperties: true,
        errorMessage: {
            required: {
                'name': 'Name is required!',
                'category': 'Category is required!',
                'amount': 'Amount is required!',
                'type': 'Type is required!',
                'date': 'Date is required!',
            }
        }
    };

    const validate = ajv.compile(schema);

    validate(req.body);

    res.locals.validationErrors = validate.errors?.map((err) => (err.message));

    next();
};

const budgetValidator = (req, res, next) => {
    let schema = {
        type: 'object',
        properties: {
            entertainment: {
                type: 'number',
                minimum: 0,
                default: 0,
                errorMessage: {
                    minimum: 'Entertainment Budget should be at least 0',
                    type: 'Entertainment Budget should be a Number.'
                }
            },
            rent: {
                type: 'number',
                minimum: 0,
                default: 0,
                errorMessage: {
                    minimum: 'Rent Budget should be at least 0',
                    type: 'Rent Budget should be a Number.'
                }
            },
            utilities: {
                type: 'number',
                minimum: 0,
                default: 0,
                errorMessage: {
                    minimum: 'Utilities Budget should be at least 0',
                    type: 'Utilities Budget should be a Number.'
                }
            },
            groceries: {
                type: 'number',
                minimum: 0,
                default: 0,
                errorMessage: {
                    minimum: 'Groceries Budget should be at least 0',
                    type: 'Groceries Budget should be a Number.'
                }
            },
            misc: {
                type: 'number',
                minimum: 0,
                default: 0,
                errorMessage: {
                    minimum: 'Misc Budget should be at least 0',
                    type: 'Misc Budget should be a Number.'
                }
            },
            income: {
                type: 'number',
                minimum: 0,
                default: 0,
                errorMessage: {
                    minimum: 'Income should be at least 0',
                    type: 'Income should be a Number.'
                }
            },
        },
        required: [
            'entertainment',
            'rent',
            'utilities',
            'groceries',
            'misc',
            'income',
        ],
        additionalProperties: true,
        errorMessage: {
            required: {
                'name': 'Name is required!',
                'category': 'Category is required!',
                'amount': 'Amount is required!',
                'type': 'Type is required!',
                'date': 'Date is required!',
            }
        }
    };

    const validate = ajv.compile(schema);

    validate(req.body);

    res.locals.validationErrors = validate.errors?.map((err) => (err.message));

    next();
};

module.exports = {
    transactionValidator,
    budgetValidator
};