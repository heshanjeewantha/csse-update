const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  wasteBin: { type: mongoose.Schema.Types.ObjectId, ref: 'TrashBin', required: true },
  pickupDate: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  collectedWasteAmount: { type: Number, default: 0 } // in kg
});

module.exports = mongoose.model('Pickup', pickupSchema);
