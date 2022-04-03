import React from 'react';
import { useEffect, useState } from 'react';

const Transactions = (props) => {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [pageOptions, setPageOptions] = useState([]);

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
                        {props.transactionList.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.name}</td>
                                <td>{new Date(transaction.date).toDateString()}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.type === 'income' ? "Credit" : "Debit"}</td>
                                <td>${transaction.amount}</td>
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
        </>
    );
}

export default Transactions;