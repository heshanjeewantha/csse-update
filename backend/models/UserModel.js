const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  accountType: { type: String, enum: ['Resident', 'Business'], required: true },
  wasteProduced: { type: Number, default: 0 },
  scheduledPickups: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pickup' 
  }],
  messages: [{ type: String }],
  apiKey: { type: String, default: () => Math.random().toString(36).substring(2, 15) },
  secretToken: { type: String, default: () => Math.random().toString(36).substring(2, 15) },
  isAdmin: { type: Boolean, default: false },
  creditCard: { type: String }
});

module.exports = mongoose.model('User', userSchema);
