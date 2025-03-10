import React, { useState, useEffect } from 'react';
import { apiurl } from '../api/axios';

const TransactionHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch(`${apiurl}/api/user-payments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error((await response.json()).error || 'Failed to fetch transaction history');
        }

        const data = await response.json();
        setPayments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      {payments.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {payments.map((payment) => (
            <li key={payment._id} className="py-4 shadow-sm">
              <div className="flex justify-between">
                <span className="font-medium">Dr. {payment.doctorName}</span>
                <span>₹{payment.paymentAmount.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500">{new Date(payment.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">{payment.discountApplied ? 'Discount Applied of 10%' : 'No Discount'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
