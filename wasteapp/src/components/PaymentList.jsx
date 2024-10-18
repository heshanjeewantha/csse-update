// src/components/PaymentList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/payments');
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await axios.delete(`http://localhost:8070/api/payments/${id}`);
        // Refresh the payment list after deletion
        setPayments(payments.filter(payment => payment._id !== id));
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  return (
    <div>
      <h2>Payment List</h2>
      <Link to="/paymentform" className="btn btn-primary mb-3">Add New Payment</Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            
            <th>Recipt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.userId}</td>
              <td>{payment.paymentAmount}</td>
              <td>{payment.paymentStatus}</td>
              <td>
                {payment.receiptUrl ? (
                  <img
                    src={payment.receiptUrl}
                    alt="Receipt"
                    style={{ width: '300px', height: 'auto' }} // Adjust image size
                  />
                ) : (
                  'No Receipt'
                )}
              </td>
              <td>
                <Link to={`/paymentform/${payment._id}`} className="btn btn-warning">Edit</Link>
                <button onClick={() => handleDelete(payment._id)} className="btn btn-danger ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
