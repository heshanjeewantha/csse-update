// src/components/AddDriver.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const AddDriver = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [routes, setRoutes] = useState([]); // Available routes
  const [selectedRoutes, setSelectedRoutes] = useState([]); // Routes assigned to the driver
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Routek'); // Endpoint to fetch available routes
        setRoutes(response.data); // Assuming response.data contains an array of route objects
      } catch (error) {
        console.error('Error fetching routes:', error);
        setError('Failed to fetch routes');
      }
    };

    fetchRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload for adding a new driver
    const newDriver = {
      name,
      employeeId,
      vehicleNumber,
      routes: selectedRoutes, // Use selectedRoutes
    };

    try {
      await axios.post('http://localhost:8070/Driver/add', newDriver);
      alert('Driver added successfully!');
      navigate('/drivers');
    } catch (error) {
      console.error('Error adding driver:', error);
      setError('Failed to add driver');
    }
  };

  if (error) {
    return <p className="text-danger">{error}</p>; // Use Bootstrap styling for error message
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add Driver</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Name:
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Employee ID:
            <input
              type="text"
              className="form-control"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Vehicle Number:
            <input
              type="text"
              className="form-control"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Routes:
            <select
              multiple
              className="form-select"
              value={selectedRoutes}
              onChange={(e) => {
                const options = e.target.options;
                const value = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    value.push(options[i].value);
                  }
                }
                setSelectedRoutes(value);
              }}
            >
              {routes.map(route => (
                <option key={route._id} value={route._id}>
                  {route.routeName} {/* Display route name */}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Add Driver</button>
      </form>
    </div>
  );
};

export default AddDriver;
