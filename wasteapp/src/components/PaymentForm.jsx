// src/components/PaymentForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PaymentForm = () => {
  const [payment, setPayment] = useState({
    userId: '',
    trashBinId: '',
    paymentAmount: '',
    paymentMethod: 'Credit Card', // Default to first option
    transactionId: '',
    paymentStatus: 'Pending', // Default payment status
    dateOfPayment: '', // Will be set to current date on submit
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
    userEmail: '',
    receiptUrl: '',
    discountCode: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch payment details if in edit mode
  useEffect(() => {
    if (id) {
      const fetchPayment = async () => {
        try {
          const response = await axios.get(`http://localhost:8070/api/payments/${id}`);
          setPayment(response.data);
          setIsEditing(true);
        } catch (error) {
          console.error("Error fetching payment:", error);
        }
      };
      fetchPayment();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [key, subKey] = name.split('.');
      setPayment((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [subKey]: value,
        },
      }));
    } else {
      setPayment((prev) => ({ ...prev, [name]: value }));
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Set dateOfPayment to the current date if creating a new payment
    if (!isEditing) {
      payment.dateOfPayment = new Date(); // Set to current date/time
    }
  
    try {
      let response;
      if (isEditing) {
        response = await axios.put(`http://localhost:8070/api/payments/${id}`, payment);
      } else {
        response = await axios.post('http://localhost:8070/api/payments', payment);
      }
  
      // Use the ID from the response to navigate to the PaymentDetail page
      const paymentId = isEditing ? id : response.data._id;
      navigate(`/paymentdetail/${paymentId}`); // Redirect to the detail page of the submitted payment
  
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/api/payments/${id}`);
      navigate('/paymentdetail'); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  return (
    <div className="container mt-4 payment-form">
      <h2 className="text-center">{isEditing ? 'Edit Payment' : 'Submit Payment'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>User name</label>
              <input
                type="text"
                name="userId"
                value={payment.userId}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Trash Bin ID</label>
              <input
                type="text"
                name="trashBinId"
                value={payment.trashBinId}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Payment Amount</label>
              <input
                type="number"
                name="paymentAmount"
                value={payment.paymentAmount}
                onChange={handleChange}
                required
                min="0"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Payment Method</label>
              <select
                name="paymentMethod"
                value={payment.paymentMethod}
                onChange={handleChange}
                required
                className="form-control"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Digital Wallet">Digital Wallet</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Transaction ID</label>
          <input
            type="text"
            name="transactionId"
            value={payment.transactionId}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Date of Payment</label>
          <input
            type="date"
            name="dateOfPayment"
            value={payment.dateOfPayment.split('T')[0]}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <h4>Billing Address</h4>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Street</label>
              <input
                type="text"
                name="billingAddress.street"
                value={payment.billingAddress.street}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="billingAddress.city"
                value={payment.billingAddress.city}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="billingAddress.state"
                value={payment.billingAddress.state}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="billingAddress.postalCode"
                value={payment.billingAddress.postalCode}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>User Email</label>
          <input
            type="email"
            name="userEmail"
            value={payment.userEmail}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Receipt URL</label>
          <input
            type="text"
            name="receiptUrl"
            value={payment.receiptUrl}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Discount Code</label>
          <input
            type="text"
            name="discountCode"
            value={payment.discountCode}
            placeholder='if available'
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          {isEditing ? 'Update Payment' : 'Submit Payment'}
        </button>
      </form>

      {isEditing && (
        <div className="mt-3">
          <button onClick={handleDelete} className="btn btn-danger btn-block">Delete Payment</button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;