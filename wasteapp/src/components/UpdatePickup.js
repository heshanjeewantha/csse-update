// src/components/UpdatePickup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePickup = () => {
  const { id } = useParams(); // Get the pickup ID from the URL
  const navigate = useNavigate(); // To navigate after form submission

  // State to hold the pickup details
  const [pickup, setPickup] = useState({
    user: '',
    wasteBin: '',
    pickupDate: '',
    isCompleted: false,
    collectedWasteAmount: 0,
    
  });

  const [users, setUsers] = useState([]); // To hold all users for dropdown
  const [TrashBin, setWasteBins] = useState([]); // To hold all waste bins for dropdown
  const [error, setError] = useState(''); // Error handling

  // Fetch the pickup details when the component mounts
  useEffect(() => {
    const fetchPickupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Pickup/${id}`);
        setPickup(response.data); // Set the fetched pickup data
      } catch (error) {
        setError('Error fetching pickup details');
      }
    };

    const fetchUsersAndBins = async () => {
      try {
        // Fetch all users for the dropdown
        const usersResponse = await axios.get('http://localhost:8070/Users');
        setUsers(usersResponse.data);

        // Fetch all waste bins for the dropdown
        const binsResponse = await axios.get('http://localhost:8070/TrashBin');
        setWasteBins(binsResponse.data);
      } catch (error) {
        setError('Error fetching users or bins');
      }
    };

    fetchPickupDetails();
    fetchUsersAndBins();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPickup({ ...pickup, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setPickup({ ...pickup, isCompleted: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8070/Pickup/editpickup/${id}`, pickup);
      alert('Pickup updated successfully!');
      navigate('/pickups'); // Navigate back to the pickups list after successful update
    } catch (error) {
      alert('Error updating pickup');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Pickup</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">User:</label>
          <select
            className="form-control"
            name="user"
            value={pickup.user}
            onChange={handleChange}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Trash Bin:</label>
          <select
            className="form-control"
            name="TrashBin"
            value={pickup.TrashBin}
            onChange={handleChange}
            required
          >
            <option value="">Select Waste Bin</option>
            {TrashBin.map((bin) => (
              <option key={bin._id} value={bin._id}>
                {bin.location.coordinates.join(', ')}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Pickup Date:</label>
          <input
            type="datetime-local"
            className="form-control"
            name="pickupDate"
            value={pickup.pickupDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Collected Waste Amount (kg):</label>
          <input
            type="number"
            className="form-control"
            name="collectedWasteAmount"
            value={pickup.collectedWasteAmount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="isCompleted"
            checked={pickup.isCompleted}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label">Is Completed</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Pickup
        </button>
      </form>
    </div>
  );
};

export default UpdatePickup;
