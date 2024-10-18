// src/components/Drivers.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Table, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { AiFillDelete } from "react-icons/ai"; // Import trash bin icon
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]); // State to store driver data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track any errors
  const { isAuthenticated } = useAuth0(); // Get authentication status

  // Fetch drivers from API on component mount
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Driver");
        setDrivers(response.data);
      } catch (error) {
        setError("Error fetching drivers");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };
    fetchDrivers();
  }, []);

  // Delete a driver and update state
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/Driver/delete/${id}`);
      setDrivers(drivers.filter((driver) => driver._id !== id));
      alert("Driver deleted successfully!");
    } catch (error) {
      alert("Error deleting driver");
    }
  };

  // Render access denied message if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">
          <Alert.Heading>Access Denied!</Alert.Heading>
          <p>You need to be logged in to view this page.</p>
        </Alert>
      </div>
    );
  }

  // Render loading spinner if data is still loading
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading drivers...</p>
      </div>
    );
  }

  // Render error message if there was an issue fetching data
  if (error) {
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Drivers List</h1>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/adddriver">
          <Button variant="primary">Add New Driver</Button>
        </Link>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover className="table-align-middle">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Vehicle Number</th>
              <th>Routes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver._id}>
                <td>{driver.name}</td>
                <td>{driver.employeeId}</td>
                <td>{driver.vehicleNumber}</td>
                <td>
                  {driver.routes && driver.routes.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {driver.routes.map((route) => (
                        <li key={route._id}>
                          <Badge bg="secondary" className="me-1">
                            {route.routeName}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Badge bg="warning" text="dark">
                      No routes assigned
                    </Badge>
                  )}
                </td>
                <td className="d-flex">
                  <Link to={`/editdriver/${driver._id}`}>
                    <Button variant="warning" className="me-2"><FaEdit /></Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(driver._id)}
                    className="d-flex align-items-center"
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Drivers;
