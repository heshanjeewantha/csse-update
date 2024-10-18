import React, { useState, useEffect } from "react";
import axios from "axios";

const AddPickup = () => {
  const [users, setUsers] = useState([]);
  const [bins, setBins] = useState([]);
  const [user, setUser] = useState("");
  const [wasteBin, setWasteBin] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [collectedWasteAmount, setCollectedWasteAmount] = useState("");

  // Fetch users and bins for selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("http://localhost:8070/Users");
        const binsRes = await axios.get("http://localhost:8070/TrashBin");
        setUsers(usersRes.data);
        setBins(binsRes.data);
      } catch (error) {
        console.error("Error fetching users/bins", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPickup = {
      user,
      wasteBin,
      pickupDate,
      isCompleted,
      collectedWasteAmount: parseFloat(collectedWasteAmount),
    };

    try {
      await axios.post("http://localhost:8070/Pickup/add", newPickup);
      alert("Pickup added successfully!");
    } catch (error) {
      console.error("Error adding pickup:", error);
      alert("Failed to add pickup");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Pickup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">User</label>
          <select className="form-select" value={user} onChange={(e) => setUser(e.target.value)} required>
            <option value="">Select a user</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Waste Bin</label>
          <select className="form-select" value={wasteBin} onChange={(e) => setWasteBin(e.target.value)} required>
            <option value="">Select a waste bin</option>
            {bins.map((bin) => (
              <option key={bin._id} value={bin._id}>
                {bin.location.coordinates.join(", ")}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Pickup Date</label>
          <input
            type="datetime-local"
            className="form-control"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Is Completed</label>
          <input
            type="checkbox"
            className="form-check-input"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Collected Waste Amount (kg)</label>
          <input
            type="number"
            className="form-control"
            value={collectedWasteAmount}
            onChange={(e) => setCollectedWasteAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Pickup</button>
      </form>
    </div>
  );
};

export default AddPickup;
