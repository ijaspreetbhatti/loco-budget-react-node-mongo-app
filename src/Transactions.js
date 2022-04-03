import React from 'react';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_LIST':
            return action.payload;
        case 'UPDATE_LIST':
            return [...state.filter(transaction => transaction._id != action.payload.transactionId), action.payload.newTransaction];
        default:
            break;
    }
}

const Transactions = (props) => {
    const [transactionList, dispatch] = useReducer(reducer, []);

    useEffect(function loadList() {
        axios.get(`/api/v1/transaction?count=10&page=0`)
            .then((result) => {
                dispatch({ type: 'LOAD_LIST', payload: result.data })
            })
            .catch((err) => { console.log(err) })
    }, []);

    return (
        <>
            <div className="transactions">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.name}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Transactions;