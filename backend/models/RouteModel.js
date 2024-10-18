const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  wasteBins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TrashBin' }], // bins to collect
  optimizedPath: [[Number]], // GPS coordinates array for the optimized path
  totalDistance: { type: Number }, // in kilometers
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  routeName: { type: String, required: true }, // Name of the route
  startLocation: { type: [Number], required: true }, // GPS coordinates for start
  endLocation: { type: [Number], required: true } // GPS coordinates for end
});

module.exports = mongoose.model('Route', routeSchema);

