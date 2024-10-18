// src/components/PaymentDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

const PaymentDetail = () => {
  const [payment, setPayment] = useState(null);
  const { id } = useParams(); // Assuming the payment ID will be passed as a route param
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        // Fetch specific payment details based on the payment ID
        const response = await axios.get(`http://localhost:8070/api/payments/${id}`);
        setPayment(response.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPayment();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await axios.delete(`http://localhost:8070/api/payments/${id}`);
        navigate('/paymentform'); // Redirect to the payment list after deletion
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  if (!payment) {
    return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div></div>;
  }


  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Payment Details</h2>
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Payment Information</h4>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>User ID:</strong> {payment.userId}</p>
              <p><strong>Trash Bin ID:</strong> {payment.trashBinId}</p>
              <p><strong>Payment Amount:</strong> ${payment.paymentAmount}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Payment Method:</strong> {payment.paymentMethod}</p>
              <p><strong>Transaction ID:</strong> {payment.transactionId}</p>
              <p><strong>Date of Payment:</strong> {new Date(payment.dateOfPayment).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <p><strong>User Email:</strong> {payment.userEmail}</p>
              <p><strong>Payment Status:</strong> {payment.paymentStatus}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Billing Address:</strong></p>
              <p>{payment.billingAddress.street}, {payment.billingAddress.city}, {payment.billingAddress.state}, {payment.billingAddress.postalCode}</p>
            </div>
            <div className="col-md-6">
            <p><strong>Recipt:</strong></p>
             <p>{payment.receiptUrl ? (
                  <img
                    src={payment.receiptUrl}
                    alt="Receipt"
                    style={{ width: '300px', height: 'auto' }} // Adjust image size
                  />
                ) : (
                  'No Receipt'
                )} </p>
                </div>
                </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to={`/paymentform/${id}`} className="btn btn-warning">
              Edit Payment
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;