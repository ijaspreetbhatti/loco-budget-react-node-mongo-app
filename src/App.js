import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import './style.css';

import Transactions from './Transactions';
import Loading from './Loading';
import BudgetCreationDialog from './BudgetCreationDialog';

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

const App = (props) => {
    const [showBudgetDialog, setShowBudgetDialog] = useState(false);
    const [showLoading, setLoading] = useState(false);

    const [transactionList, dispatch] = useReducer(reducer, []);
    const [totalTransactions, setTotalTransactions] = useState(10);

    const getTransactions = (count, page) => {
        setLoading(true);
        axios.get(`/api/v1/transaction?count=${count}&page=${page}`)
            .then((result) => {
                setLoading(false);
                setTotalTransactions(result.data.totalTransactions);
                dispatch({ type: 'LOAD_LIST', payload: result.data.list })
            })
            .catch((err) => { console.log(err) });
    };

    useEffect(function loadList() {
        getTransactions(10, 0);
    }, []);

    const handleBudgetClick = (e) => {
        setShowBudgetDialog(!showBudgetDialog);
    }

    return (
        <>
            <header>
                <h1>Loco Budget</h1>
                <button onClick={e => handleTransactionClick(e)}>Add New Transaction</button>
                <button onClick={e => handleBudgetClick(e)}>Manage Budget</button>
            </header>
            <Transactions setLoading={setLoading} loadList={getTransactions} transactionList={transactionList} totalTransactions={totalTransactions} />
            {showBudgetDialog ? <BudgetCreationDialog /> : null}
            {showLoading ? <Loading /> : null}
        </>
    );
}

export default App;