// routes/routeRoutes.js
const express = require('express');
const router = express.Router();
const Route = require('../models/RouteModel'); // Import Route model

// POST route to add a new Route
// POST route to add a new Route

router.post('/add', async (req, res) => {
    try {
        const { driver, wasteBins, optimizedPath, totalDistance, status, routeName, startLocation, endLocation } = req.body;

        const newRoute = new Route({
            driver,
            wasteBins,
            optimizedPath,
            totalDistance,
            status,
            routeName,
            startLocation,
            endLocation,
        });

        await newRoute.save();

        res.status(201).json({ success: true, data: newRoute });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding route', error: error.message });
    }
});


// GET all routes


router.get('/', async (req, res) => {
    try {
        const routes = await Route.find(); // Populate assignedDriver details
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching routes', error });
    }
});

// GET a specific route by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const route = await Route.findById(id);

        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.json(route);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching route', error });
    }
});

// PUT route to update a route
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { routeName, startLocation, endLocation, distance, assignedDriver } = req.body;

    try {
        const updatedRoute = await Route.findByIdAndUpdate(
            id,
            { routeName, startLocation, endLocation, distance, assignedDriver },
            { new: true }
        );

        if (!updatedRoute) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.json(updatedRoute);
    } catch (error) {
        res.status(500).json({ message: 'Error updating route', error });
    }
});

// DELETE route to delete a route
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoute = await Route.findByIdAndDelete(id);

        if (!deletedRoute) {
            return res.status(404).json({ message: 'Route not found' });
        }

        res.json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting route', error });
    }
});

module.exports = router;
