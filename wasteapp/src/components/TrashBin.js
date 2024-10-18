import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Tooltip, OverlayTrigger, Container, Row, Col, Table, Button, Alert, Card } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Trashbins = () => {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get("http://localhost:8070/TrashBin");
        setBins(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching bins");
        setLoading(false);
      }
    };
    fetchBins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/TrashBin/delete/${id}`);
      setBins(bins.filter((bin) => bin._id !== id));
      alert("Trash bin deleted successfully!");
    } catch (error) {
      alert("Error deleting trash bin");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-5">
        <h3 className="text-danger">Access Denied!</h3>
        <p>You need to be logged in to view this profile.</p>
      </div>
    );
  }

  if (loading) {
    return <p>Loading bins...</p>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const totalBins = bins.length;
  const totalCapacity = bins.reduce((total, bin) => total + bin.binCapacity, 0);
  const totalFillLevel = bins.reduce((total, bin) => total + bin.currentFillLevel, 0);
  const averageFillLevel = totalBins > 0 ? (totalFillLevel / totalBins).toFixed(2) : 0;

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Trash Bin Dashboard</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Total Bins</Card.Title>
              <Card.Text className="display-6">{totalBins}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Total Capacity</Card.Title>
              <Card.Text className="display-6">{totalCapacity} Liters</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center bg-light shadow-sm">
            <Card.Body>
              <Card.Title>Average Fill Level</Card.Title>
              <Card.Text className="display-6">{averageFillLevel} Liters</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/add">
          <Button variant="primary">Add New Trash Bin</Button>
        </Link>
      </div>

      <div className="table-responsive shadow-sm">
        <Table striped bordered hover>
          <thead className="table-light">
            <tr>
              <th>Location</th>
              <th>Capacity (Liters)</th>
              <th>Current Fill Level (Liters)</th>
              <th>Status</th>
              <th>Last Emptied</th>
              <th>Actions</th>
              <th>QR Code</th>
            </tr>
          </thead>
          <tbody>
            {bins.map((bin) => {
              const qrCodeValue = `${window.location.origin}/bin-details/${bin._id}`;
              const fillLevelPercentage = ((bin.currentFillLevel / bin.binCapacity) * 100).toFixed(2);

              return (
                <tr key={bin._id}>
                  <td>{bin.location.coordinates.join(", ")}</td>
                  <td>{bin.binCapacity}</td>
                  <td>{bin.currentFillLevel}</td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${bin._id}`}>
                          {fillLevelPercentage}% Full
                        </Tooltip>
                      }
                    >
                      <Badge
                        pill
                        bg={fillLevelPercentage > 75 ? "danger" : fillLevelPercentage > 50 ? "warning" : "success"}
                      >
                        {bin.isFull ? "Full" : "Available"}
                      </Badge>
                    </OverlayTrigger>
                  </td>
                  <td>{bin.lastEmptiedAt ? new Date(bin.lastEmptiedAt).toLocaleString() : "N/A"}</td>
                  <td className="d-flex flex-column flex-md-row">
                    <Link to={`/edit/${bin._id}`}>
                      <Button variant="warning" className="me-md-2 mb-2 mb-md-0"><FaEdit /></Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(bin._id)}>
                    <FaTrash />
                    </Button>
                  </td>
                  <td>
                    <QRCodeCanvas
                      value={qrCodeValue}
                      size={80}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="Q"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Trashbins;
