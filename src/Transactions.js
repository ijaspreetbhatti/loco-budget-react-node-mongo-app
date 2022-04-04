import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import TransactionDialog from './TransactionDialog';

const Transactions = (props) => {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [pageOptions, setPageOptions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    const [showTransactionDialog, setShowTransactionDialog] = useState(false);

    useEffect(function init() {
        calculatePageOptions();
    }, []);

    useEffect(function handlePropChange() {
        calculatePageOptions();
    }, [props, count])

    useEffect(function handleListChange() {
        props.loadList(count, page);
    }, [count, page])

    const calculatePageOptions = () => {
        const options = [];
        for (let i = 0; i < Math.ceil(props.totalTransactions / count); i++) {
            options.push(<option key={i} value={i}>{i + 1}</option>)
        }
        setPageOptions(options);
    }

    const handleCountChange = (e) => {
        setCount(Number(e.target.value));
        setPage(0);
    }

    const handlePageChange = (e) => {
        setPage(Number(e.target.value));
    }

    const handleTransactionClose = (newTransaction) => {
        setShowTransactionDialog(!showTransactionDialog);
        if (newTransaction && typeof newTransaction === 'string') {
            axios.delete(`/api/v1/transaction/${selectedTransaction._id}`)
                .then((result) => {
                    props.dispatch({ type: 'DELETE_TRANSACTION', payload: { transactionId: selectedTransaction._id } });
                    props.refreshBudgetComponent();
                })
                .catch((err) => { console.log(err) });
        } else if (newTransaction) {
            props.dispatch({ type: 'UPDATE_LIST', payload: { newTransaction: { ...newTransaction, saving: true } } });
            axios.put(`/api/v1/transaction/${selectedTransaction._id}`, newTransaction)
                .then((result) => {
                    props.dispatch({ type: 'UPDATE_SAVED_TRANSACTION', payload: { newTransaction: result.data } });
                    props.refreshBudgetComponent();
                })
                .catch((err) => { console.log(err) });
        }
    }

    const handleEditTransaction = (e, id) => {
        setSelectedTransaction(props.transactionList.find(b => b._id === id));
        setShowTransactionDialog(!showTransactionDialog);
    }


    return (
        <>
            <div className="transactions">
                <h2>Transactions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.transactionList.map((transaction) => (
                            <tr key={transaction._id} style={transaction.saving ? { backgroundColor: 'yellow' } : null}>
                                <td>{transaction.name}</td>
                                <td>{transaction.date.split('T')[0]}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.type === 'income' ? "Credit" : "Debit"}</td>
                                <td>${transaction.amount}</td>
                                <td className="opts">
                                    <button style={{ padding: '0.1rem 0.5rem' }} onClick={e => handleEditTransaction(e, transaction._id)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <label>
                        Count:
                        <select value={count} onChange={e => handleCountChange(e)}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                        </select>
                    </label>
                    <label>
                        Page:
                        <select value={page} onChange={e => handlePageChange(e)}>
                            {pageOptions}
                        </select>
                    </label>
                </div>
            </div>
            {showTransactionDialog ? <TransactionDialog close={handleTransactionClose} transaction={selectedTransaction} showDeleteButton /> : null}
        </>
    );
}

export default Transactions;