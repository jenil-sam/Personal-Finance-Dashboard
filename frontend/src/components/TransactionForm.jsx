import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/Record.css";


function TransactionForm() {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString();
      if (!id) return;

      setIsNew(false);
      const response = await fetch(`http://localhost:5050/record/${id}`);
      if (!response.ok) return;
      const record = await response.json();
      if (!record) return navigate("/");
      setForm({
        type: record.type,
        amount: record.amount,
        category: record.category,
        description: record.description,
        date: new Date(record.date).toISOString().split("T")[0],
      });
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const url = isNew
        ? "http://localhost:5050/record"
        : `http://localhost:5050/record/${params.id}`;
      const method = isNew ? "POST" : "PATCH";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to save record");
      navigate("/transactions");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="transaction-form-container">
      <h3>{isNew ? "Add Transaction" : "Edit Transaction"}</h3>
      <form onSubmit={onSubmit}>
        <label>
          Type
          <select
            value={form.type}
            onChange={(e) => updateForm({ type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label>
          Amount
          <input
            type="number"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
            required
          />
        </label>

        <label>
          Category
          <input
            type="text"
            value={form.category}
            onChange={(e) => updateForm({ category: e.target.value })}
          />
        </label>

        <label>
          Description
          <input
            type="text"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </label>

        <label>
          Date
          <input
            type="date"
            value={form.date}
            onChange={(e) => updateForm({ date: e.target.value })}
          />
        </label>

        <button type="submit">{isNew ? "Add Transaction" : "Save Changes"}</button>
      </form>
    </div>
  );
}


export default TransactionForm