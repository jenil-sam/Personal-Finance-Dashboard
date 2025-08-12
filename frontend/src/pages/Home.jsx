import '../css/home.css';
import Dashboard from "../components/Dashboard"
import List from "../components/List";
import { useState } from "react";

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const informations = [
        { id: 1, income: 2500, expense: 800, balance: 1700, lastUpdated: "2025-08-11", currency: "USD", budgetCategory: "Personal" },
        { id: 2, income: 4000, expense: 1500, balance: 2500, lastUpdated: "2025-08-10", currency: "USD", budgetCategory: "Work" },
        { id: 3, income: 3200, expense: 1100, balance: 2100, lastUpdated: "2025-08-09", currency: "USD", budgetCategory: "Business" },
        { id: 4, income: 2800, expense: 900, balance: 1900, lastUpdated: "2025-08-08", currency: "USD", budgetCategory: "Social" },
        { id: 5, income: 5000, expense: 2000, balance: 3000, lastUpdated: "2025-08-07", currency: "USD", budgetCategory: "Personal" }
    ];

    // Calculate totals
    const totalIncome = informations.reduce((sum, item) => sum + item.income, 0);
    const totalExpense = informations.reduce((sum, item) => sum + item.expense, 0);
    const totalBalance = totalIncome - totalExpense;

    const totals = {
        income: totalIncome,
        expense: totalExpense,
        balance: totalBalance,
        lastUpdated: new Date().toISOString().split("T")[0],
        currency: "USD"
    };

    const handleSearch = (e) => {
        // prevents loading
        e.preventDefault()
        alert(searchQuery)

        //updates the set to blank after being searched
        // setSearchQuery("")

    }
    return (
        <div className="Home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for recent transactions..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                />
                <button type="submit" className="search-button" >Search</button>
            </form>
            <div className="dashboard-grid">
                {/* shows the total of all the transactions */}
                <Dashboard information={totals} />
            </div>
            <div className="transaction-grid">
                {/* transaction is each individual object of information so each indivudal item in the array */}
                {informations.map((transaction) =>
                    transaction.budgetCategory.toLowerCase().startsWith(searchQuery) && (<List information={transaction} key={transaction.id} />))}
            </div>
        </div>
    )
}


export default Home