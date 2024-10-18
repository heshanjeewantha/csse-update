const express = require("express");
const UserPayment = require("../models/UserPayment"); 
const router = express.Router();

// Create a new payment
router.post("/", async (req, res) => {
  try {
    const newPayment = new UserPayment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await UserPayment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a payment by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPayment = await UserPayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a payment by ID
router.delete("/:id", async (req, res) => {
  try {
    await UserPayment.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Payment deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a payment by ID
router.get("/:id", async (req, res) => {
  try {
    const payment = await UserPayment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found." });
    res.status(200).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
