import React, { useState, useEffect } from "react";
import axios from "axios";
import MapSelector from "./MapSelector";

const AddRoute = () => {
  const [drivers, setDrivers] = useState([]);
  const [bins, setBins] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedBins, setSelectedBins] = useState([]);
  const [routeName, setRouteName] = useState("");
  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [optimizedPath, setOptimizedPath] = useState([]);
  const [totalDistance, setTotalDistance] = useState("");

  // Fetch drivers and bins for selection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversRes = await axios.get("http://localhost:8070/Driver");
        const binsRes = await axios.get("http://localhost:8070/TrashBin");
        setDrivers(driversRes.data);
        setBins(binsRes.data);
      } catch (error) {
        console.error("Error fetching drivers/bins", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRoute = {
      driver: selectedDriver,
      wasteBins: selectedBins,
      optimizedPath,
      totalDistance: parseFloat(totalDistance),
      routeName,
      startLocation,
      endLocation,
    };

    try {
      await axios.post("http://localhost:8070/Routek/add", newRoute);
      alert("Route added successfully!");
    } catch (error) {
      console.error("Error adding route:", error);
      alert("Failed to add route");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Route</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Driver</label>
          <select
            className="form-select"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            required
          >
            <option value="">Select a driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Waste Bins</label>
          <select
            className="form-select"
            multiple
            value={selectedBins}
            onChange={(e) =>
              setSelectedBins(Array.from(e.target.selectedOptions, (option) => option.value))
            }
            required
          >
            {bins.map((bin) => (
              <option key={bin._id} value={bin._id}>
                {bin.location.coordinates.join(", ")}
              </option>
            ))}
          </select>
          <small className="form-text text-muted">
            Hold Ctrl (Windows) or Command (Mac) to select multiple bins.
          </small>
        </div>

        <div className="mb-3">
          <label className="form-label">Route Name</label>
          <input
            type="text"
            className="form-control"
            value={routeName}
            onChange={(e) => setRouteName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select Start and End Locations</label>
          <MapSelector
  onSelectStart={setStartLocation}
  onSelectEnd={setEndLocation}
  onSelectPath={(path, distance) => {
    setOptimizedPath(path); // Save optimized path
    setTotalDistance(distance); // Save total distance
  }}
  bins={bins}
/>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Route
        </button>
      </form>
    </div>
  );
};

export default AddRoute;
