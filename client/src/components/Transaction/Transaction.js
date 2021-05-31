import './Transaction.css';

const Transaction = ({ name, amount }) => {

    const sign = amount >= 0 ? '' : '-';
    const suplClassName = amount >= 0 ? 'list-item positive' : 'list-item negative';

    return (
        <li className={suplClassName}>
            <span>{name}</span><span>{sign}${Math.abs(amount)}</span>
        </li>
    )
}

export default Transaction;