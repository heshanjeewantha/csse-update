const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  accountType: { type: String, enum: ['Resident', 'Business'], required: true },
  wasteProduced: { type: Number, default: 0 }, // in kg
  scheduledPickups: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pickup' 
  }] // references pickup schedules
});

module.exports = mongoose.model('User', userSchema);
