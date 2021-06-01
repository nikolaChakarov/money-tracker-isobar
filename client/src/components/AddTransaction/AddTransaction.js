import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import './AddTransaction.css';

const AddTransaction = () => {

    const [info, setInfo] = useState({
        name: '',
        amount: 0
    });

    const { dispatch } = useContext(GlobalContext);

    const onInputChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        });
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const dbAddTransactionRes = await (await (fetch('http://localhost:5000/api/payments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    ...info
                })
            }))).json();

            if (!dbAddTransactionRes) {
                throw dbAddTransactionRes;
            }

            dispatch({
                type: 'GET_USER_TRANSACTIONS#INIT'
            });

            setInfo({
                name: '',
                amount: 0
            });

            // getUserTransactions();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className="add-transaction-section">
            <h2>Add Transaction</h2>

            <form
                className="add-form"
                onSubmit={onFormSubmit}
            >
                <div className="form-element">
                    <label htmlFor="name">Type Of Transaction:</label>
                    <input
                        className="input-value"
                        type="text"
                        name="name"
                        value={info.name}
                        onChange={onInputChange}
                        required
                    />
                </div>

                <div className="form-element">
                    <label htmlFor="amount">Enter Your Amount:</label>
                    <input
                        className="input-value"
                        type="number"
                        name="amount"
                        value={info.amount}
                        onChange={onInputChange}
                    />
                </div>

                <input type="submit" value="Add Transaction" className="btn btn-add" />
            </form>
        </section>
    )

}

export default AddTransaction;