function List({ information }) {
    return (
        <div className="list-container">
            <div className="list-overlay">
            </div>

            <div className="finance-info">
                <div className="income">
                    <h3>Income</h3>
                    <p>${information.income}</p>
                </div>
                <div className="expenses">
                    <h3>Expenses</h3>
                    <p>${information.expense}</p>
                </div>
                <div className="balance">
                    <h3>Balance</h3>
                    <p>${information.balance}</p>
                </div>
                <div className="last-updated">
                    <h3>Last Balance</h3>
                    <p>${information.updated}</p>
                </div>
                <div className="currency">
                    <h3>Currency</h3>
                    <p>${information.currency}</p>
                </div>
                <div className="savings-goal">
                    <h3>Savings Goal</h3>
                    <p>${information.savings}</p>
                </div>
                <div className="balance-card">
                    <h3>Current Balance</h3>
                    <p>${information.balance}</p>
                </div>
                <div className="monthly-savings">
                    <h3>Monthly Savingse</h3>
                    <p>${information.monthSavings}</p>
                </div>
                <div className="budget-category">
                    <h3>Budget Category</h3>
                    <p>{information.budgetCategory}</p>
                </div>
            </div>
        </div>

    )
}


export default List