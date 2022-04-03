import React from 'react';
import { useState } from 'react';

import './style.css';

import Transactions from './Transactions';
import Loading from './Loading';
import BudgetCreationDialog from './BudgetCreationDialog';

const App = (props) => {
    const [showBudgetDialog, setShowBudgetDialog] = useState(false);
    const [showLoading, setLoading] = useState(false);

    const handleBudgetClick = (e) => {
        setShowBudgetDialog(!showBudgetDialog);
    }

    return (
        <>
            <header>
                <h1>Loco Budget</h1>
                <button onClick={e => handleBudgetClick(e)}>Manage Budget</button>
            </header>
            <Transactions />
            {showBudgetDialog ? <BudgetCreationDialog /> : null}
            {showLoading ? <Loading /> : null}
        </>
    );
}

export default App;