import React from 'react';
import { useState } from 'react';

const TransactionCategoryList = [
    {
        name: 'Entertainment',
        value: 'entertainment'
    },
    {
        name: 'Rent',
        value: 'rent'
    },
    {
        name: 'Utilities',
        value: 'utilities'
    },
    {
        name: 'Groceries',
        value: 'groceries'
    },
    {
        name: 'Misc',
        value: 'misc'
    },
    {
        name: 'Salary',
        value: 'salary'
    },
    {
        name: 'Income',
        value: 'income'
    },
];

const TransactionDialog = (props) => {
    const [name, setName] = useState(props.transaction ? props.transaction.name : '');
    const [category, setCategory] = useState(props.transaction ? props.transaction.category : 'entertainment');
    const [amount, setAmount] = useState(props.transaction ? props.transaction.amount : 0);
    const [type, setType] = useState(props.transaction ? props.transaction.type : 'expenses');
    const [date, setDate] = useState(props.transaction ? props.transaction.date.split('T')[0] : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const rs = {
            name: name,
            category: category,
            amount: Number(amount),
            type: type,
            date: new Date(date).toISOString()
        };
        props.close(rs);
    };

    const handleClose = (e) => {
        e.preventDefault();
        props.close(null);
    };

    const handleDelete = (e) => {
        props.close(props.transaction._id);
    };

    return (
        <>
            <div className="dialog">
                <div className="form-dialog">
                    <div>
                        <h2>{props.transaction ? `Edit Transaction: ${props.transaction.name}` : 'Create Transaction'}</h2>

                        <button onClick={e => handleClose(e)}>X</button>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <label>Name:<br></br>
                            <input type="text" value={name} maxLength={40} onChange={e => setName(e.target.value)} required />
                        </label>
                        <label>Type:<br></br>
                            <select value={type} onChange={e => setType(e.target.value)} required>
                                <option value="income">Credit</option>
                                <option value="expenses">Debit</option>
                            </select>
                        </label>
                        <label>Category:<br></br>
                            <select value={category} onChange={e => setCategory(e.target.value)} required>
                                {TransactionCategoryList.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                            </select>
                        </label>
                        <label>Date:<br></br>
                            <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                        </label>
                        <label>Amount:<br></br>
                            <input type="number" min={0.01} step={0.01} value={amount} onChange={e => setAmount(e.target.value)} required />
                        </label>
                        <button type="submit">Save Transaction</button>
                        {props.showDeleteButton ? <button style={{ backgroundColor: "red" }} onClick={e => handleDelete(e)}>Delete</button> : null}
                    </form>
                </div>
            </div>
        </>
    );
}

export default TransactionDialog;