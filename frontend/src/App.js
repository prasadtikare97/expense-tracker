import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://expense-tracker-8ads.onrender.com';
function App() {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  const [expenses, setExpenses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('date_desc');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError('');

      const params = {};
      if (categoryFilter) {
        params.category = categoryFilter;
      }
      if (sortOrder) {
        params.sort = sortOrder;
      }

      const response = await axios.get(`${API_BASE_URL}/expenses`, { params });
      setExpenses(response.data);
    } catch (err) {
      setError('Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [categoryFilter, sortOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormError('');
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.description || !formData.date) {
      setFormError('Please fill all fields');
      return;
    }

    try {
      setSubmitting(true);
      setFormError('');

      const payload = {
        id: crypto.randomUUID(),
        amount: Number(formData.amount),
        category: formData.category,
        description: formData.description,
        date: formData.date
      };

      await axios.post(`${API_BASE_URL}/expenses`, payload);

      resetForm();
      fetchExpenses();
    } catch (err) {
      if (err.response && err.response.data) {
        const firstError = Object.values(err.response.data)[0];
        setFormError(firstError || 'Failed to add expense');
      } else {
        setFormError('Failed to add expense');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }, [expenses]);

  const uniqueCategories = useMemo(() => {
    const categories = expenses.map((expense) => expense.category);
    return [...new Set(categories)];
  }, [expenses]);

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <div className="card">
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit} className="expense-form">
          <input
            type="number"
            step="0.01"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Expense'}
          </button>
        </form>

        {formError && <p className="error-text">{formError}</p>}
      </div>

      <div className="card">
        <h2>Filters</h2>
        <div className="filters">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="date_desc">Newest First</option>
          </select>
        </div>
      </div>

      <div className="card">
        <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      </div>

      <div className="card">
        <h2>Expenses</h2>

        {loading ? (
          <p>Loading expenses...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>${Number(expense.amount).toFixed(2)}</td>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;