import React from 'react';
import { useState, useEffect } from 'react';

const BudgetDialog = (props) => {
    const [name, setName] = useState(props.budget ? props.budget.name : '');
    const [entertainment, setEntertainment] = useState(props.budget ? props.budget.entertainment : 0);
    const [rent, setRent] = useState(props.budget ? props.budget.rent : 0);
    const [utilities, setUtilities] = useState(props.budget ? props.budget.utilities : 0);
    const [groceries, setGroceries] = useState(props.budget ? props.budget.groceries : 0);
    const [misc, setMisc] = useState(props.budget ? props.budget.misc : 0);
    const [income, setIncome] = useState(props.budget ? props.budget.income : 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        props.close({
            name: name,
            entertainment: entertainment,
            rent: rent,
            utilities: utilities,
            groceries: groceries,
            misc: misc,
            income: income,
        });
    };

    const handleClose = (e) => {
        e.preventDefault();
        props.close(null);
    };

    const handleDelete = (e) => {
        props.close(props.budget._id);
    };

    return (
        <>
            <div className="dialog">
                <div className="form-dialog">
                    <div>
                        <h2>{props.budget ? `Edit Budget: ${props.budget.name}` : 'Create Budget'}</h2>
                        <button onClick={e => handleClose(e)}>X</button>
                    </div>
                    <form onSubmit={e => handleSubmit(e)}>
                        <label>Name:<br></br>
                            <input type="text" maxLength={40} value={name} onChange={e => setName(e.target.value)} required />
                        </label>
                        <label >Income:<br></br>
                            <input type="number" min={0} value={income} onChange={e => setIncome(e.target.value)} required />
                        </label>
                        <label >Entertainment:<br></br>
                            <input type="number" min={0} value={entertainment} onChange={e => setEntertainment(e.target.value)} required />
                        </label>
                        <label >Rent:<br></br>
                            <input type="number" min={0} value={rent} onChange={e => setRent(e.target.value)} required />
                        </label>
                        <label >Utilities:<br></br>
                            <input type="number" min={0} value={utilities} onChange={e => setUtilities(e.target.value)} required />
                        </label>
                        <label >Groceries:<br></br>
                            <input type="number" min={0} value={groceries} onChange={e => setGroceries(e.target.value)} required />
                        </label>
                        <label >Misc:<br></br>
                            <input type="number" min={0} value={misc} onChange={e => setMisc(e.target.value)} required />
                        </label>
                        <button type="submit">Save Budget</button>
                        {props.showDeleteButton ? <button style={{ backgroundColor: "red" }} onClick={e => handleDelete(e)}>Delete</button> : null}
                    </form>
                </div>
            </div>
        </>
    );
}

export default BudgetDialog;