import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import './style.css';

import Budget from './Budget';
import Transactions from './Transactions';
import Loading from './Loading';
import BudgetDialog from './BudgetDialog';
import TransactionDialog from './TransactionDialog';

const reducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case 'LOAD_LIST':
            return action.payload;
        case 'UPDATE_LIST':
            return [action.payload.newTransaction, ...state.filter(transaction => transaction._id ? transaction._id != action.payload.transactionId : true)];
        case 'UPDATE_SAVED_TRANSACTION':
            return [action.payload.newTransaction, ...state.filter(transaction => !transaction.saving)];
        case 'DELETE_TRANSACTION':
            return [...state.filter(transaction => transaction._id ? transaction._id != action.payload.transactionId : true)];
        default:
            break;
    }
}

const App = (props) => {
    const [showBudgetDialog, setShowBudgetDialog] = useState(false);
    const [showTransactionDialog, setShowTransactionDialog] = useState(false);
    const [showLoading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

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

    const refreshBudgetComponent = () => {
        setRefresh(!refresh);
    }

    useEffect(function loadList() {
        getTransactions(10, 0);
    }, []);

    const handleBudgetClick = (e) => {
        setShowBudgetDialog(!showBudgetDialog);
    }

    const handleTransactionClick = (e) => {
        setShowTransactionDialog(!showTransactionDialog);
    }

    const handleTransactionClose = (newTransaction) => {
        setShowTransactionDialog(!showTransactionDialog);
        if (newTransaction) {
            dispatch({ type: 'UPDATE_LIST', payload: { newTransaction: { ...newTransaction, saving: true, _id: 'newTransaction' } } });
            axios.post(`/api/v1/transaction`, newTransaction)
                .then((result) => {
                    dispatch({ type: 'UPDATE_SAVED_TRANSACTION', payload: { newTransaction: result.data.data } });
                    refreshBudgetComponent();
                })
                .catch((err) => { console.log(err) });
        }
    }

    const handleBudgetClose = (newBudget) => {
        setShowBudgetDialog(!showBudgetDialog);
        if (newBudget) {
            axios.post(`/api/v1/budget`, newBudget)
                .then((result) => {
                    refreshBudgetComponent();
                })
                .catch((err) => { console.log(err) });
        }
    }


    return (
        <>
            <header>
                <h1>Loco Budget</h1>
                <button onClick={e => handleTransactionClick(e)}>Add New Transaction</button>
                <button onClick={e => handleBudgetClick(e)}>Create New Budget</button>
            </header>
            <main>
                <Budget refresh={refresh} refreshBudgetComponent={refreshBudgetComponent}></Budget>
                <Transactions refreshBudgetComponent={refreshBudgetComponent} dispatch={dispatch} setLoading={setLoading} loadList={getTransactions} transactionList={transactionList} totalTransactions={totalTransactions} />
                {showBudgetDialog ? <BudgetDialog close={handleBudgetClose} /> : null}
                {showTransactionDialog ? <TransactionDialog close={handleTransactionClose} /> : null}
                {showLoading ? <Loading /> : null}
            </main>
        </>
    );
}

export default App;