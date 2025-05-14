import React, { useState, useEffect } from 'react';
import { calculateRewardPoints, calculateMonthlyPoints } from './services/rewardService';
import { MONTHS, YEARS } from './constants/dateConstants';
import './App.css'
const App = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [monthlyPoints, setMonthlyPoints] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('Jan');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Fetching Data
  useEffect(() => {
    fetch('/mockData.json')
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle Click on Customer
  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    const monthlyData = calculateMonthlyPoints(customer.transactions);
    setMonthlyPoints(monthlyData);
    filterTransactions(customer.transactions, selectedMonth, selectedYear);
  };

  // Handle Month and Year Change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    if (selectedCustomer) {
      filterTransactions(selectedCustomer.transactions, e.target.value, selectedYear);
    }
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    if (selectedCustomer) {
      filterTransactions(selectedCustomer.transactions, selectedMonth, e.target.value);
    }
  };

  // Filtering Transactions
  const filterTransactions = (transactions, month, year) => {
    const filtered = transactions.filter((transaction) => {
      const date = new Date(transaction.date);
      const transactionMonth = date.toLocaleString('default', { month: 'short' });
      const transactionYear = date.getFullYear().toString();
      return transactionMonth === month && transactionYear === year;
    });

    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map((customer) => (
          <li 
            key={customer.customerId} 
            onClick={() => handleCustomerClick(customer)}
            style={{ cursor: 'pointer', color: 'whitespace' }}
          >
            {customer.name} (ID: {customer.customerId})
          </li>
        ))}
      </ul>

      {selectedCustomer && (
        <div>
          <h2>Transactions for {selectedCustomer.name}</h2>

          {/* Filters */}
          <div style={{ marginBottom: '10px' }}>
            <label>Month: </label>
            <select value={selectedMonth} onChange={handleMonthChange}>
              {MONTHS.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            <label style={{ marginLeft: '10px' }}>Year: </label>
            <select value={selectedYear} onChange={handleYearChange}>
              {YEARS.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Transactions Table */}
          {filteredTransactions.length > 0 ? (
            <table border="1" cellPadding="5">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount ($)</th>
                  <th>Date</th>
                  <th>Reward Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.transactionsId}>
                    <td>{transaction.transactionsId}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.date}</td>
                    <td>{calculateRewardPoints(transaction.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found for this period.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;