import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

import './Transaction.css';

const Transaction = ({ name, amount, _id }) => {

    const { deletePayment } = useContext(GlobalContext);

    const deleteItem = (e) => {
        const itemId = e.target.dataset.id;

        deletePayment(itemId);
    }

    const sign = amount >= 0 ? '' : '-';

    const suplClassName = amount >= 0 ? 'list-item positive' : 'list-item negative';

    const amountToStr = Math.abs(amount).toFixed(2);

    return (
        <li className={suplClassName}>
            <span>{name}</span><span>{sign}${amountToStr}</span>
            <div
                className="remove-list-item"
                onClick={deleteItem}
                data-id={_id}
            >X</div>
        </li>
    )
}

export default Transaction;