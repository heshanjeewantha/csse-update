// src/components/BinDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BinDetails = () => {
  const { id } = useParams(); // Get the bin ID from the URL
  const [bin, setBin] = useState(null);

  useEffect(() => {
    const fetchBinDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/TrashBin/${id}`);
        setBin(response.data); // Store bin details
      } catch (error) {
        console.error('Failed to fetch bin details', error);
      }
    };
    fetchBinDetails();
  }, [id]);

  if (!bin) {
    return <p>Loading bin details...</p>; // Show loading message
  }

  return (
    <div className="container mt-4">
      <h2>Bin Details</h2>
      <p><strong>Location:</strong> {bin.location.coordinates.join(', ')}</p>
      <p><strong>Address:</strong> {bin.address}</p>
      <p><strong>Type:</strong> {bin.type}</p>
      <p><strong>Capacity:</strong> {bin.capacity}L</p>
      <p><strong>Current Fill Level:</strong> {bin.currentFillLevel}%</p>
      <p><strong>Last Emptied:</strong> {new Date(bin.lastEmptied).toLocaleDateString()}</p>
    </div>
  );
};

export default BinDetails;
