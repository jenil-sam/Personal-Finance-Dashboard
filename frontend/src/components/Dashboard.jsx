import '../css/dashboard.css';
import { useNavigate } from "react-router-dom";

function Dashboard({ information }) {
    const navigate = useNavigate();
    function onAdd() {
        navigate("/transactionsNew");
    }
    return (
        <div className="dashboard-container">
            <div className="dashboard-overlay">
                <button className="Add" onClick={onAdd}>+</button>
            </div>

            <div className="finance-info">
                <div className="income-card">
                    <h3>Total Income</h3>
                    <p>${information.income}</p>
                </div>
                <div className="expenses-card">
                    <h3>Total Expenses</h3>
                    <p>${information.expense}</p>
                </div>
                <div className="balance-card">
                    <h3>Current Balance</h3>
                    <p>${information.balance}</p>
                </div>
            </div>
        </div>

    )
}


export default Dashboard