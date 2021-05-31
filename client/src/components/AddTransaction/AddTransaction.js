import { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const AddTransaction = () => {

    const [amount, setAmount] = useState(0);

    const { getUserTransactions } = useContext(GlobalContext);

    const onAmountChange = (e) => {
        setAmount(e.target.value);
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
                    transaction: amount
                })
            }))).json();

            if (!dbAddTransactionRes) {
                throw dbAddTransactionRes;
            }

            getUserTransactions();
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
                <label htmlFor="amount">Enter Your Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={onAmountChange}
                />

                <input type="submit" value="Add Transaction" />
            </form>
        </section>
    )

}

export default AddTransaction;