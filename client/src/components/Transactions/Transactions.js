import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import AddTransaction from '../AddTransaction/AddTransaction';

const Transactions = () => {

    const { state, getUserTransactions } = useContext(GlobalContext);
    const [balance, setBalance] = useState('');

    useEffect(() => {
        console.log('useEffect from Transactions.js');
        getUserTransactions();
        calcCurrentBalace();
    }, []);


    const calcCurrentBalace = () => {
        const test = JSON.parse(localStorage.getItem('userTransactions')) || [];
        console.log(test);
        const res = test.reduce((acc, curr) => {
            acc += curr.transaction;
            return acc;
        }, 0);

        setBalance(res);
    }

    return (
        <>
            <h1>Your Balance: {balance}</h1>
            <h3>History of payments</h3>
            {state.userTransactions.map(el => (
                <li key={el._id}>{el.transaction}</li>
            ))}

            <AddTransaction />
        </>
    )

}

export default Transactions;