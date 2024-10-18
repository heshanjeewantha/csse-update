import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const UpdateDriver = () => {
  const { id } = useParams(); // Get the driver ID from the route parameters
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [routes, setRoutes] = useState([]); // Available routes
  const [selectedRoutes, setSelectedRoutes] = useState([]); // Routes assigned to the driver
  const [error, setError] = useState('');

  // Fetch the existing driver data when the component mounts
  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Driver/${id}`);
        const driver = response.data;

        // Set the data in the state
        setName(driver.name || '');
        setEmployeeId(driver.employeeId || '');
        setVehicleNumber(driver.vehicleNumber || '');
        setSelectedRoutes(driver.routes ? driver.routes.map(route => route._id) : []); // Ensure routes is an array
      } catch (error) {
        console.error('Error fetching driver:', error);
        setError('Failed to fetch driver data');
      }
    };

    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Routek'); // Correct route endpoint
        setRoutes(response.data); // Assuming response.data contains an array of route objects
      } catch (error) {
        console.error('Error fetching routes:', error);
        setError('Failed to fetch routes');
      }
    };

    fetchDriver();
    fetchRoutes();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload for updating the driver
    const updatedDriver = {
      name,
      employeeId,
      vehicleNumber,
      routes: selectedRoutes, // Use selectedRoutes
    };

    try {
      await axios.put(`http://localhost:8070/Driver/edit/${id}`, updatedDriver); // Ensure correct URL
      alert('Driver updated successfully!');
      navigate('/drivers'); // Navigate back to the drivers list
    } catch (error) {
      console.error('Error updating driver:', error);
      setError('Failed to update driver');
    }
  };

  const handleRouteChange = (e) => {
    const options = e.target.options;
    const value = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedRoutes(value);
  };

  if (error) {
    return <p className="text-danger">{error}</p>; // Use Bootstrap styling for error message
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center">Update Driver</h2>
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
              onChange={handleRouteChange}
            >
              {routes.map(route => (
                <option key={route._id} value={route._id}>
                  {route.routeName} {/* Display route name */}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Update Driver</button>
      </form>
    </div>
  );
};

export default UpdateDriver;
