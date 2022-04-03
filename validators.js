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
                    'ultilities',
                    'groceries',
                    'misc'
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
                    type: 'Amount should be a number.'
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

    res.locals.validationErrors = validate.errors?.map((err) => ({ message: err.message }));

    next();
};

module.exports = {
    transactionValidator
};