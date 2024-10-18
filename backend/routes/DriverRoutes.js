const express = require('express');
const router = express.Router();
const Driver = require('../models/DriverModel'); // Import Driver model

// POST route to add a new driver
router.post('/add', async (req, res) => {
  try {
    const { name, employeeId, vehicleNumber } = req.body;

    // Create a new Driver record
    const newDriver = new Driver({
      name,
      employeeId,
      vehicleNumber
    });

    // Save the new driver to the database
    await newDriver.save();

    res.status(201).json({
      success: true,
      data: newDriver
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding driver',
      error: error.message
    });
  }
});

// GET route to retrieve all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find().populate('routes'); // Populate routes
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers', error });
  }
});

// GET route to retrieve a single driver by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const driver = await Driver.findById(id).populate('routes'); // Populate routes

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver', error });
  }
});

// PUT route to update driver details
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name, employeeId, vehicleNumber, routes } = req.body;

  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { name, employeeId, vehicleNumber, routes },
      { new: true }
    );

    if (!updatedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver', error });
  }
});

// DELETE route to delete a driver
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error });
  }
});

module.exports = router;
