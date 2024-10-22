import React, { useState } from 'react';
import axios from 'axios';
import MapSelector2 from './Mapselector2'; // Import the MapSelector component

const AddTrashBin = () => {
    const [location, setLocation] = useState(null); // Store selected location object
    const [binCapacity, setBinCapacity] = useState('');
    const [currentFillLevel, setCurrentFillLevel] = useState('');
    const [isFull, setIsFull] = useState(false);
    const [lastEmptiedAt, setLastEmptiedAt] = useState('');
    const [error, setError] = useState(''); // Error state for validation

    // Function to handle changes in fill level and auto-set 'isFull' if needed
    const handleFillLevelChange = (value) => {
        setCurrentFillLevel(value);

        if (parseFloat(value) === parseFloat(binCapacity)) {
            setIsFull(true); // Set isFull to true if fill level matches capacity
        } else {
            setIsFull(false); // Set isFull to false if it doesn't match
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if current fill level is greater than capacity
        if (parseFloat(currentFillLevel) > parseFloat(binCapacity)) {
            setError('Current fill level cannot exceed bin capacity.');
            return;
        }

        if (!location) {
            alert('Please select a location on the map.');
            return;
        }

        const trashBinData = {
            location: {
                type: 'Point',
                coordinates: [location.lng, location.lat], // Store [longitude, latitude]
            },
            binCapacity: parseFloat(binCapacity),
            currentFillLevel: parseFloat(currentFillLevel),
            isFull,
            lastEmptiedAt: lastEmptiedAt || null,
        };

        try {
            const response = await axios.post('http://localhost:8070/TrashBin/add', trashBinData);
            console.log('Response:', response.data);
            alert('Trash Bin added successfully!');
            setLocation(null);
            setBinCapacity('');
            setCurrentFillLevel('');
            setIsFull(false);
            setLastEmptiedAt('');
            setError('');
        } catch (error) {
            console.error('Error adding Trash Bin:', error);
            alert('Failed to add Trash Bin');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add Trash Bin</h2>
            <form onSubmit={handleSubmit}>
                {/* Map Selector for Location */}
                <div className="mb-3">
                    <label className="form-label">Select Location</label>
                    <MapSelector2 onSelectLocation={setLocation} />
                    <small className="form-text text-muted">
                        Click on the map to select a location.
                    </small>
                </div>

                {/* Display Selected Location */}
                {location && (
                    <div className="mb-3">
                        <label className="form-label">Selected Location (lng, lat)</label>
                        <input
                            type="text"
                            className="form-control"
                            value={`${location.lng}, ${location.lat}`}
                            readOnly
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Bin Capacity (Liters):</label>
                    <input
                        type="number"
                        className="form-control"
                        value={binCapacity}
                        onChange={(e) => setBinCapacity(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Current Fill Level (Liters):</label>
                    <input
                        type="number"
                        className="form-control"
                        value={currentFillLevel}
                        onChange={(e) => handleFillLevelChange(e.target.value)}
                    />
                </div>

                {/* Display validation error if any */}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-check-label">Is Full:</label>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isFull}
                            onChange={(e) => setIsFull(e.target.checked)} readOnly
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Emptied At:</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={lastEmptiedAt}
                        onChange={(e) => setLastEmptiedAt(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add Trash Bin</button>
            </form>
        </div>
    );
};

export default AddTrashBin;
