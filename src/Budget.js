import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

import BudgetDialog from './BudgetDialog';

const Budget = (props) => {
    const [budgetList, setBudgetList] = useState([]);
    const [periodList, setPeriodList] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState(`${new Date().getFullYear()}/${new Date().getMonth() + 1}`);
    const [selectedBudget, setSelectedBudget] = useState({
        _id: 0,
        name: 0,
        entertainment: 0,
        rent: 0,
        utilities: 0,
        groceries: 0,
        misc: 0,
        income: 0
    });
    const [selectedPeriodData, setSelectedPeriodData] = useState({
        entertainment: 0,
        rent: 0,
        utilities: 0,
        groceries: 0,
        misc: 0,
        income: 0
    });

    const [showBudgetDialog, setShowBudgetDialog] = useState(false);

    const loadBudgets = (setFirstBudget) => {
        axios.get('/api/v1/budget')
            .then(result => {
                console.log(result.data);
                setBudgetList(result.data);
                if (setFirstBudget) {
                    setSelectedBudget(result.data[0])
                }
            })
            .catch(err => { console.error(err) })
    };

    const loadPeriodList = () => {
        const list = [];
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        for (let index = -6; index <= 6; index++) {
            if (month + index <= 12 && month + index >= 1) {
                list.push(`${year}/${month + index}`);
            } else if (month + index < 1) {
                list.push(`${year - 1}/${month + index + 12}`);
            } else if (month + index > 12) {
                list.push(`${year + 1}/${month + index - 12}`);
            }
        }
        setPeriodList(list);
    }

    const loadPeriodData = () => {
        axios.get(`/api/v1/transaction/${selectedPeriod}`)
            .then((result) => {
                const data = result.data.reduce((prev, curr) => {
                    const newObj = { ...prev };
                    newObj[curr._id] = curr.total;
                    return newObj;
                }, {});
                console.log(data);
                setSelectedPeriodData({
                    entertainment: data.entertainment ? data.entertainment : 0,
                    rent: data.rent ? data.rent : 0,
                    utilities: data.utilities ? data.utilities : 0,
                    groceries: data.groceries ? data.groceries : 0,
                    misc: data.misc ? data.misc : 0,
                    income: (data.salary ? data.salary : 0) + (data.income ? data.income : 0)
                });
            })
            .catch((error) => { console.log(error) })
    };

    const getPercentage = (field) => {
        return ((selectedPeriodData[field] / selectedBudget[field]) * 100).toFixed(2);
    }

    useEffect(function () {
        loadBudgets(true);
        loadPeriodList();
        loadPeriodData();
    }, []);

    useEffect(function () {
        loadPeriodData();
    }, [selectedPeriod])

    useEffect(function () {
        loadBudgets();
        loadPeriodData();
    }, [props]);

    const handleBudgetChange = (e) => {
        setSelectedBudget(budgetList.find(b => b._id === e.target.value));
    }

    const handleMonthChange = (e) => {
        setSelectedPeriod(e.target.value);
    }

    const handleEditBudget = e => {
        setShowBudgetDialog(!showBudgetDialog);
    }

    const handleBudgetClose = (newBudget) => {
        setShowBudgetDialog(!showBudgetDialog);
        if (newBudget && typeof newBudget === 'string') {
            axios.delete(`/api/v1/budget/${selectedBudget._id}`)
                .then((result) => {
                    props.refreshBudgetComponent();
                })
                .catch((err) => { console.log(err) });
        } else if (newBudget) {
            axios.put(`/api/v1/budget/${selectedBudget._id}`, newBudget)
                .then((result) => {
                    loadBudgets(true);
                })
                .catch((err) => { console.log(err) });
        }
    }

    return (
        <>
            <div className="budget">
                <div className="budget-tab">
                    <h2>Budget</h2>
                    <div>
                        <label>Period:
                            <select value={selectedPeriod} onChange={e => handleMonthChange(e)}>
                                {periodList.map(period => <option key={period} value={period}>{period}</option>)}
                            </select>
                        </label>
                        <label>Budget:
                            <select onChange={e => handleBudgetChange(e)}>
                                {budgetList.map(budget => <option key={budget._id} value={budget._id}>{budget.name}</option>)}
                            </select>
                        </label>
                        <button style={{ padding: '0.1rem 0.5rem' }} onClick={e => handleEditBudget(e)}>Edit</button>
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Category</th>
                                <th>Budget</th>
                                <th>Used</th>
                                <th>%age</th>
                            </tr>
                            <tr>
                                <td>Income</td>
                                <td>${selectedBudget.income}</td>
                                <td>${selectedPeriodData.income}</td>
                                <td>{selectedBudget.income == 0 ? '-' : getPercentage('income') + '%'}</td>
                            </tr>
                            <tr>
                                <td>Entertainment</td>
                                <td>${selectedBudget.entertainment}</td>
                                <td>${selectedPeriodData.entertainment}</td>
                                <td>{selectedBudget.entertainment == 0 ? '-' : getPercentage('entertainment') + '%'}</td>
                            </tr>
                            <tr>
                                <td>Rent</td>
                                <td>${selectedBudget.rent}</td>
                                <td>${selectedPeriodData.rent}</td>
                                <td>{selectedBudget.rent == 0 ? '-' : getPercentage('rent') + '%'}</td>
                            </tr>
                            <tr>
                                <td>Utilities</td>
                                <td>${selectedBudget.utilities}</td>
                                <td>${selectedPeriodData.utilities}</td>
                                <td>{selectedBudget.utilities == 0 ? '-' : getPercentage('utilities') + '%'}</td>
                            </tr>
                            <tr>
                                <td>Groceries</td>
                                <td>${selectedBudget.groceries}</td>
                                <td>${selectedPeriodData.groceries}</td>
                                <td>{selectedBudget.groceries == 0 ? '-' : getPercentage('groceries') + '%'}</td>
                            </tr>
                            <tr>
                                <td>Misc</td>
                                <td>${selectedBudget.misc}</td>
                                <td>${selectedPeriodData.misc}</td>
                                <td>{selectedBudget.misc == 0 ? '-' : getPercentage('misc') + '%'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
            {showBudgetDialog ? <BudgetDialog close={handleBudgetClose} budget={selectedBudget} showDeleteButton /> : null}
        </>
    );
}

export default Budget;