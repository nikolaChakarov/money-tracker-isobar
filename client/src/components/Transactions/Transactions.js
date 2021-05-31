import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import Transaction from '../Transaction/Transaction';
import AddTransaction from '../AddTransaction/AddTransaction';

import './Transactions.css';

const Transactions = () => {

    const { state, getUserTransactions } = useContext(GlobalContext);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        //  console.log('useEffect from Transactions.js');

        if (!state.transactionsInit) {
            getUserTransactions();
        }

        calcCurrentBalace();
    }, [state.transactionsInit]);

    //console.log(state);


    const calcCurrentBalace = () => {
        //console.log(state.userTransactions);
        // const test = JSON.parse(localStorage.getItem('userTransactions')) || [];
        const res = state.userTransactions.reduce((acc, curr) => {
            acc += curr.amount;
            return acc;
        }, 0);

        setBalance(res);
    }

    return (
        <section className="transactions">
            <h1>Your Balance: {balance}</h1>
            <h3>History of payments</h3>
            {state.userTransactions.map(el => (
                <Transaction key={el._id} {...el} />
            ))}

            <AddTransaction />
        </section>
    )

}

export default Transactions;