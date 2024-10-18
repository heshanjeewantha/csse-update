const express = require('express');
const router = express.Router();
const Pickup = require('../models/PickupModel'); // Import Pickup model


// POST route to add a Pickup
router.post('/add', async (req, res) => {
    try {
        const { user, wasteBin, pickupDate, isCompleted, collectedWasteAmount } = req.body;

        // Create a new Pickup record
        const newPickup = new Pickup({
            user,
            wasteBin,
            pickupDate,
            isCompleted,
            collectedWasteAmount
        });

        // Save the new Pickup to the database
        await newPickup.save();

        res.status(201).json({
            success: true,
            data: newPickup
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding Pickup',
            error: error.message
        });
    }
});


router.get('/', async (req, res) => {
    try {
        const pickups = await Pickup.find();
        res.json(pickups);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Pickups', error });
    }
});



router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the trash bin by its ID
        const pickup = await Pickup.findById(id);

        if (!pickup) {
            return res.status(404).json({ message: 'Pickup not found' });
        }

        // If found, return the bin data
        res.json(pickup);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Pickup', error });
    }
});

// PUT route to update a pickup
router.put('/editpickup/:id', async (req, res) => {
    const { id } = req.params;
    const { user, wasteBin, pickupDate, isCompleted, collectedWasteAmount } = req.body;

    try {
        const updatedPickup = await Pickup.findByIdAndUpdate(
            id,
            { user, wasteBin, pickupDate, isCompleted, collectedWasteAmount },
            { new: true }
        );

        if (!updatedPickup) {
            return res.status(404).json({ message: 'Pickup not found' });
        }

        res.json(updatedPickup);
    } catch (error) {
        res.status(500).json({ message: 'Error updating pickup', error });
    }
});

// DELETE route to delete a pickup
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPickup = await Pickup.findByIdAndDelete(id);

        if (!deletedPickup) {
            return res.status(404).json({ message: 'Pickup not found' });
        }

        res.json({ message: 'Pickup deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting pickup', error });
    }
});

module.exports = router;
