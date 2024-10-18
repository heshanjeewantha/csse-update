const mongoose = require("mongoose");

const UserPaymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    
    trim: true, // Trims whitespace
  },
  trashBinId: {
    type: String,
    required: true,
    trim: true, // Trims whitespace
  },
  paymentAmount: {
    type: Number,
    required: true,
    min: 0, // Minimum payment amount
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'Digital Wallet'],
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
    trim: true, // Trims whitespace
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  dateOfPayment: {
    type: Date,
    default: Date.now, // Automatically set to the current date/time
  },
  billingAddress: {
    street: {
      type: String,
      required: true,
      trim: true, // Trims whitespace
    },
    city: {
      type: String,
      required: true,
      trim: true, // Trims whitespace
    },
    state: {
      type: String,
      required: true,
      trim: true, // Trims whitespace
    },
    postalCode: {
      type: String,
      required: true,
      trim: true, // Trims whitespace
    },
  },
  userEmail: {
    type: String,
    required: true,
    trim: true, // Trims whitespace
    lowercase: true, // Converts email to lowercase
  },
  receiptUrl: {
    type: String,
    trim: true, // Trims whitespace
  },
  discountCode: {
    type: String,
    default: null,
    trim: true, // Trims whitespace
  },
});

// Export the model
module.exports = mongoose.model("UserPayment", UserPaymentSchema);
