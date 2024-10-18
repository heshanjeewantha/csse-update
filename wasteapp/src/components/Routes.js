import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import RouteMap from "./RouteMap"; // Import the RouteMap component
import { useAuth0 } from "@auth0/auth0-react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons from react-icons

const Routes = () => {
  const [routes, setRoutes] = useState([]); // Store route data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track any errors
  const { isAuthenticated } = useAuth0(); // Get authentication status

  // Fetch all routes when the component mounts
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Routek");
        setRoutes(response.data); // Store routes
      } catch (error) {
        setError("Error fetching routes.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };
    fetchRoutes();
  }, []);

  // Handle route deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/Routek/delete/${id}`);
      setRoutes(routes.filter((route) => route._id !== id)); // Update state after deletion
      alert("Route deleted successfully!");
    } catch (error) {
      alert("Error deleting route.");
    }
  };

  // Render "Access Denied" if the user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Access Denied!</h3>
        <p>You need to be logged in to view this page.</p>
      </div>
    );
  }

  // Render loading spinner
  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading routes...</p>
      </div>
    );
  }

  // Render error message if any
  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4" style={{ color: "#28a745" }}>Routes List</h1>

      {/* Add Route Button */}
      <div className="text-end mb-3">
        <Link to="/addroute">
          <button className="btn btn-success">Add New Route</button>
        </Link>
      </div>

      {/* Routes Table */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead style={{ backgroundColor: "#e9f5e9" }}>
            <tr>
              <th>Route Name</th>
              <th>Driver</th>
              <th>Start Location</th>
              <th>End Location</th>
              <th>Total Distance (km)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route._id}>
                <td>{route.routeName}</td>
                <td>{route.driver ? route.driver.name : "No driver assigned"}</td>
                <td>{route.startLocation.join(", ")}</td>
                <td>{route.endLocation.join(", ")}</td>
                <td>{route.totalDistance || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${route.status === "Active" ? "bg-success" : "bg-secondary"}`}
                    style={{ padding: "8px", borderRadius: "12px" }}
                  >
                    {route.status}
                  </span>
                </td>
                <td className="d-flex justify-content-around">
                  <Link to={`/editroute/${route._id}`}>
                    <button className="btn btn-warning me-2">
                      <FaEdit /> {/* Edit icon */}
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(route._id)}
                  >
                    <FaTrash /> {/* Trash bin icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Route Map */}
      <div className="mt-5">
        <h2 className="text-center" style={{ color: "#28a745" }}>Route Map</h2>
        <RouteMap /> {/* Render the RouteMap component */}
      </div>
    </div>
  );
};

export default Routes;
