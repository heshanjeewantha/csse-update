import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRoute = () => {
  const { id } = useParams(); // Get the route ID from the URL
  const navigate = useNavigate(); // To navigate after form submission

  // State to hold the route details
  const [route, setRoute] = useState({
    driver: '',
    wasteBins: [],
    routeName: '',
    startLocation: [0, 0], // [lng, lat]
    endLocation: [0, 0], // [lng, lat]
    optimizedPath: [],
    totalDistance: 0,
  });

  const [drivers, setDrivers] = useState([]); // To hold all drivers for dropdown
  const [bins, setBins] = useState([]); // To hold all waste bins for dropdown
  const [error, setError] = useState(''); // Error handling

  // Fetch the route details when the component mounts
  useEffect(() => {
    const fetchRouteDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Routek/${id}`);
        setRoute(response.data); // Set the fetched route data
      } catch (error) {
        setError('Error fetching route details');
      }
    };

    const fetchDriversAndBins = async () => {
      try {
        // Fetch all drivers for the dropdown
        const driversResponse = await axios.get('http://localhost:8070/Driver');
        setDrivers(driversResponse.data);

        // Fetch all waste bins for the dropdown
        const binsResponse = await axios.get('http://localhost:8070/TrashBin');
        setBins(binsResponse.data);
      } catch (error) {
        setError('Error fetching drivers or bins');
      }
    };

    fetchRouteDetails();
    fetchDriversAndBins();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoute({ ...route, [name]: value });
  };

  const handleStartEndChange = (e) => {
    const { name, value } = e.target;
    const coords = value.split(',').map(Number);
    setRoute({ ...route, [name]: coords });
  };

  const handleOptimizedPathChange = (e) => {
    const path = e.target.value.split(';').map(coord => coord.split(',').map(Number));
    setRoute({ ...route, optimizedPath: path });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8070/Routek/edit/${id}`, route);
      alert('Route updated successfully!');
      navigate('/routes'); // Navigate back to the routes list after successful update
    } catch (error) {
      alert('Error updating route');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Route</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Driver:</label>
          <select
            className="form-control"
            name="driver"
            value={route.driver}
            onChange={handleChange}
            required
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Waste Bins:</label>
          <select
            className="form-control"
            name="wasteBins"
            multiple
            value={route.wasteBins}
            onChange={(e) => {
              const value = Array.from(e.target.selectedOptions, (option) => option.value);
              setRoute({ ...route, wasteBins: value });
            }}
            required
          >
            {bins.map((bin) => (
              <option key={bin._id} value={bin._id}>
                {bin.location.coordinates.join(', ')}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">Hold Ctrl (Windows) or Command (Mac) to select multiple bins.</small>
        </div>

        <div className="mb-3">
          <label className="form-label">Route Name:</label>
          <input
            type="text"
            className="form-control"
            name="routeName"
            value={route.routeName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Location (lng, lat):</label>
          <input
            type="text"
            className="form-control"
            name="startLocation"
            value={route.startLocation.join(", ")}
            onChange={handleStartEndChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">End Location (lng, lat):</label>
          <input
            type="text"
            className="form-control"
            name="endLocation"
            value={route.endLocation.join(", ")}
            onChange={handleStartEndChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Optimized Path (lng, lat array):</label>
          <input
            type="text"
            className="form-control"
            value={route.optimizedPath.map(coord => coord.join(",")).join("; ")} // e.g., "lng1, lat1; lng2, lat2"
            onChange={handleOptimizedPathChange}
            placeholder="e.g. lng1,lat1; lng2,lat2"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Distance (km):</label>
          <input
            type="number"
            className="form-control"
            name="totalDistance"
            value={route.totalDistance}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Route
        </button>
      </form>
    </div>
  );
};

export default UpdateRoute;
