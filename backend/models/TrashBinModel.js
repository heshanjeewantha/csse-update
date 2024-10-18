const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const TrachBinSchema = new mongoose.Schema({
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  binCapacity: { type: Number, required: true }, // in liters
  currentFillLevel: { type: Number, default: 0 }, // in liters
  isFull: { type: Boolean, default: false }, 
  lastEmptiedAt: { type: Date }
});

TrachBinSchema.index({ location: '2dsphere' }); // For geospatial queries


module.exports = mongoose.model("TrashBin", TrachBinSchema);
