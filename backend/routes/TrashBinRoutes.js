
const express = require('express');
const router = express.Router();
const TrashBin = require('../models/TrashBinModel'); 


// POST route to add a TrashBin
router.post('/add', async (req, res, next) => {
    try {
        const { location,
          binCapacity, 
          currentFillLevel, 
          isFull, 
          lastEmptiedAt } = req.body;

        // Create a new TrashBin record
        const newTrashBin = new TrashBin({
            location,
          binCapacity, // in liters
          currentFillLevel, // in liters
          isFull, 
          lastEmptiedAt 
        });

        // Save the new TrashBin to the database
        await newTrashBin.save();

        // Respond with success
        res.status(201).json({
            success: true,
            data: newTrashBin
        });
    } catch (error) {
        console.error(error);
        // Handle errors, either with ErrorResponse or a basic response
        res.status(500).json({
            success: false,
            message: 'Error adding TrashBin',
            error: error.message
        });
    }
});
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the trash bin by its ID
        const bin = await TrashBin.findById(id);

        if (!bin) {
            return res.status(404).json({ message: 'Trash Bin not found' });
        }

        // If found, return the bin data
        res.json(bin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Trash Bin', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const bins = await TrashBin.find();
        res.json(bins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Trash Bins', error });
    }
});




router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { location, binCapacity, currentFillLevel, isFull, lastEmptiedAt } = req.body;

    try {
        const updatedBin = await TrashBin.findByIdAndUpdate(
            id,
            {
                location,
                binCapacity,
                currentFillLevel,
                isFull,
                lastEmptiedAt
            },
            { new: true }
        );

        if (!updatedBin) {
            return res.status(404).json({ message: 'Trash Bin not found' });
        }

        res.json(updatedBin);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Trash Bin', error });
    }
});

// Delete a trash bin by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBin = await TrashBin.findByIdAndDelete(id);

        if (!deletedBin) {
            return res.status(404).json({ message: 'Trash Bin not found' });
        }

        res.json({ message: 'Trash Bin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Trash Bin', error });
    }
});

// router.get('/performance/:id', singlePerformanceRecord);
// // /api/admin/performance/update/_id
// router.put('/admin/performance/update/:id',editPerformanceRecord);
// // /api/performance
// router.get('/performance',allPerformanceRecords);
// // /api/admin/performance/delete/id
// router.delete('/admin/performance/delete/:id',  deletePerformanceRecord);
// // /api//admin/performance/report
// router.get('/admin/performance/report',  genaratePlayerPerformanceReport);


module.exports = router;