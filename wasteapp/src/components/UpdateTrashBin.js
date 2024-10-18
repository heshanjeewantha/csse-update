import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UpdateTrashBin = () => {
  const { id } = useParams(); // Get the trash bin ID from the route parameters
  const navigate = useNavigate();

  const [location, setLocation] = useState({ longitude: '', latitude: '' });
  const [binCapacity, setBinCapacity] = useState('');
  const [currentFillLevel, setCurrentFillLevel] = useState('');
  const [isFull, setIsFull] = useState(false);
  const [lastEmptiedAt, setLastEmptiedAt] = useState('');
  const [error, setError] = useState('');

  // Fetch the existing trash bin data when the component mounts
  useEffect(() => {
    const fetchTrashBin = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/TrashBin/${id}`);
        const bin = response.data;
        
        // Set the data in the state
        setLocation({
          longitude: bin.location.coordinates[0],
          latitude: bin.location.coordinates[1],
        });
        setBinCapacity(bin.binCapacity);
        setCurrentFillLevel(bin.currentFillLevel);
        setIsFull(bin.isFull);
        setLastEmptiedAt(bin.lastEmptiedAt ? new Date(bin.lastEmptiedAt).toISOString().slice(0, 16) : '');
      } catch (error) {
        console.error('Error fetching trash bin:', error);
        setError('Failed to fetch trash bin data');
      }
    };

    fetchTrashBin();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload for updating the trash bin
    const updatedTrashBin = {
        location: {
            type: 'Point',
            coordinates: [parseFloat(location.longitude), parseFloat(location.latitude)],
        },
        binCapacity: parseFloat(binCapacity),
        currentFillLevel: parseFloat(currentFillLevel),
        isFull,
        lastEmptiedAt: lastEmptiedAt || null,
    };

    try {
        await axios.put(`http://localhost:8070/TrashBin/edit/${id}`, updatedTrashBin); // Ensure correct URL
        alert('Trash Bin updated successfully!');
        navigate('/TrashBins'); // Navigate back to the trash bin list
    } catch (error) {
        console.error('Error updating Trash Bin:', error);
        setError('Failed to update Trash Bin');
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>; // Use Bootstrap styling for error message
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update Trash Bin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Location (Longitude):
            <input
              type="number"
              className="form-control"
              value={location.longitude}
              onChange={(e) => setLocation({ ...location, longitude: e.target.value })}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Location (Latitude):
            <input
              type="number"
              className="form-control"
              value={location.latitude}
              onChange={(e) => setLocation({ ...location, latitude: e.target.value })}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Bin Capacity (Liters):
            <input
              type="number"
              className="form-control"
              value={binCapacity}
              onChange={(e) => setBinCapacity(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Current Fill Level (Liters):
            <input
              type="number"
              className="form-control"
              value={currentFillLevel}
              onChange={(e) => setCurrentFillLevel(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={isFull}
            onChange={(e) => setIsFull(e.target.checked)}
          />
          <label className="form-check-label">
            Is Full
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Last Emptied At:
            <input
              type="datetime-local"
              className="form-control"
              value={lastEmptiedAt}
              onChange={(e) => setLastEmptiedAt(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Update Trash Bin</button>
      </form>
    </div>
  );
};

export default UpdateTrashBin;
