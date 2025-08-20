import '../css/home.css';
import Dashboard from "../components/Dashboard";
import { useState, useEffect } from "react";

function TransactionItem({ transaction }) {
  return (
    <div className="transaction-item">
      <p>Type: {transaction.type}</p>
      <p>Amount: ${transaction.amount}</p>
      <p>Category: {transaction.category}</p>
      <p>Description: {transaction.description}</p>
      <p>Date: {transaction.date ? new Date(transaction.date).toLocaleDateString() : "-"}</p>
    </div>
  );
}

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("http://localhost:5050/record/");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTransactions();
  }, []);

  // Calculate totals from backend data
  const totalIncome = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  const totalBalance = totalIncome - totalExpense;

  const totals = {
    income: totalIncome,
    expense: totalExpense,
    balance: totalBalance,
    lastUpdated: new Date().toISOString().split("T")[0],
    currency: "USD"
  };

  return (
    <div className="Home">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search for recent transactions..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </form>

      <div className="dashboard-grid">
        <Dashboard information={totals} />
      </div>

      <div className="transaction-grid">
        {transactions
          .filter(t => t.category?.toLowerCase().startsWith(searchQuery))
          .map(t => <TransactionItem transaction={t} key={t._id} />)}
      </div>
    </div>
  );
}

export default Home;
