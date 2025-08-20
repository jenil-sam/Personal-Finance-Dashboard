import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/transactions.css';

const TransactionRow = ({ transaction, deleteTransaction }) => (
    <tr>
        <td>{transaction.type}</td>
        <td>${transaction.amount}</td>
        <td>{transaction.category}</td>
        <td>{transaction.description}</td>
        <td>{new Date(transaction.date).toLocaleDateString()}</td>

        <td>
            <div className="action-buttons">
                <Link to={`/transactions/edit/${transaction._id}`} className="edit-button">
                    Edit
                </Link>
                <button onClick={() => deleteTransaction(transaction._id)} className="delete-button">
                    Delete
                </button>
            </div>
        </td>
    </tr>
);

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            const response = await fetch("http://localhost:5050/record/");
            if (!response.ok) return;
            const data = await response.json();
            setTransactions(data);
        }
        fetchTransactions();
    }, []);

    async function deleteTransaction(id) {
        await fetch(`http://localhost:5050/record/${id}`, { method: "DELETE" });
        setTransactions(transactions.filter((t) => t._id !== id));
    }

    if (transactions.length === 0) {
        return (
            <div className="entire-transactions">
                <h2>No transactions made</h2>
                <p>Add transaction to calculate your finance</p>
            </div>
        );
    }

    return (
        <div className="entire-transactions">
            <h2>All Transactions</h2>
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((t) => (
                        <TransactionRow
                            key={t._id}
                            transaction={t}
                            deleteTransaction={deleteTransaction}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Transactions;
