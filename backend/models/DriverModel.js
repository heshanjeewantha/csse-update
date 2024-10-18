const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  vehicleNumber: { type: String, required: true },
  routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }] // routes assigned to the driver
});

module.exports = mongoose.model('Driver', driverSchema);
