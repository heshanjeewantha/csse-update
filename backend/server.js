const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

// MongoDB URL from environment variables
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  // Remove deprecated options
});

// Check MongoDB connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success!");
});

// Import routes
const TrashBinRouter = require("./routes/TrashBinRoutes.js");
const PickupRouter = require("./routes/PickupRoutes.js");
const UserRouter = require("./routes/UserRoutes.js");
const DriverRouter = require("./routes/DriverRoutes.js");
const RouteRouter = require("./routes/RouteRoutes.js");
const paymentRouter = require("./routes/paymentroutes.js");

// Use routes
app.use("/TrashBin", TrashBinRouter);
app.use("/Pickup", PickupRouter);
app.use("/Users", UserRouter);
app.use("/Driver", DriverRouter);
app.use("/Routek", RouteRouter);
app.use("/api/payments", paymentRouter);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});

// Export the server instance for testing
module.exports = server; // This should work now
