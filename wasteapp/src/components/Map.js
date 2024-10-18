// src/components/TrashBinMap.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = { lat: 6.9271, lng: 79.8612 }; // Default center (Colombo)

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC3JCnqz0QDdjmQ8B-76QxGT9sZ1KFu7dY', // Replace with your key
  });

  const [trashBins, setTrashBins] = useState([]);

  useEffect(() => {
    const fetchTrashBins = async () => {
      try {
        const response = await axios.get('http://localhost:8070/TrashBin'); // Fetch trash bin data
        setTrashBins(response.data);
      } catch (error) {
        console.error('Error fetching trash bins:', error);
      }
    };
    fetchTrashBins();
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {trashBins.map((bin) => (
        <Marker
          key={bin._id}
          position={{
            lat: bin.location.coordinates[1],
            lng: bin.location.coordinates[0],
          }}
          title={`Capacity: ${bin.binCapacity} L`}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
