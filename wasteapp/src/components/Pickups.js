import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from "./Map";
import { Table, Button, Card, Row, Col, Container, Alert } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Pickups = () => {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useAuth0();

  // Fetch all pickups
  useEffect(() => {
    const fetchPickups = async () => {
      try {
        const response = await axios.get("http://localhost:8070/Pickup");
        setPickups(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching pickups");
        setLoading(false);
      }
    };

    fetchPickups();
  }, []);

  // Handle pickup deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/Pickup/delete/${id}`);
      setPickups(pickups.filter((pickup) => pickup._id !== id));
      alert("Pickup deleted successfully!");
    } catch (error) {
      alert("Error deleting pickup");
    }
  };

  // Render loading or error state
  if (!isAuthenticated) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Access Denied!</h3>
        <p>You need to be logged in to view this profile.</p>
      </div>
    );
  }

  if (loading) return <p>Loading pickups...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const totalPickups = pickups.length;
  const completedPickups = pickups.filter((p) => p.isCompleted).length;
  const totalWasteCollected = pickups.reduce((sum, p) => sum + p.collectedWasteAmount, 0);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Pickups Dashboard</h1>

      {/* Summary Cards Section */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Total Pickups</Card.Title>
              <Card.Text className="display-6">{totalPickups}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Completed Pickups</Card.Title>
              <Card.Text className="display-6">{completedPickups}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Total Waste Collected</Card.Title>
              <Card.Text className="display-6">{totalWasteCollected} kg</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/addpickup">
          <Button variant="primary">Add New Pickup</Button>
        </Link>
      </div>

      {/* Pickups Table Section */}
      <div className="table-responsive shadow-sm">
        <Table striped bordered hover>
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Waste Bin</th>
              <th>Pickup Date</th>
              <th>Status</th>
              <th>Collected Waste (kg)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pickups.map((pickup) => (
              <tr key={pickup._id}>
                <td>{pickup.user.name}</td>
                <td>
                  {/* Placeholder for waste bin location */}
                  {/* {pickup.wasteBin ? pickup.wasteBin.location.coordinates.join(", ") : "N/A"} */}
                </td>
                <td>{new Date(pickup.pickupDate).toLocaleString()}</td>
                <td>{pickup.isCompleted ? "Completed" : "Pending"}</td>
                <td>{pickup.collectedWasteAmount} kg</td>
                <td>
                  <Link to={`/editpickup/${pickup._id}`}>
                    <Button variant="warning" className="btn btn-warning me-2"><FaEdit /></Button>
                  </Link>
                  <Button variant="danger" className="btn btn-danger" onClick={() => handleDelete(pickup._id)}><FaTrash /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Map Section */}
      <div className="mt-5">
        <h2 className="text-center">Pickup Locations</h2>
        <Map />
      </div>
    </Container>
  );
};

export default Pickups;
