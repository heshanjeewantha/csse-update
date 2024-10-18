const express = require('express');
const router = express.Router();
const User = require('../models/UserModel'); // Adjust the path according to your project structure

// POST route to add a User
router.post('/add', async (req, res) => {
    try {
        const { name,
        email,
        password,
        address,
        accountType,
        wasteProduced, 
        scheduledPickups
        }= req.body;
 // references pickup schedules } = req.body; // Adjust fields as per your User schema

        // Create a new User record
        const newUser = new User({
            name,
            email,
            password,
            address,
            accountType,
            wasteProduced, 
            scheduledPickups
        });

        // Save the new User to the database
        await newUser.save();

        // Respond with success
        res.status(201).json({
            success: true,
            data: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error adding User',
            error: error.message,
        });
    }
});

// GET route to fetch a User by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by its ID
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If found, return the user data
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching User', error });
    }
});

// GET route to fetch all Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Users', error });
    }
});

// PUT route to update a User
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, phone, address } = req.body; // Adjust fields as needed

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                name,
                email,
                password, // Ensure to hash the password before saving
                phone,
                address,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating User', error });
    }
});

// DELETE route to delete a User by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting User', error });
    }
});

module.exports = router;
