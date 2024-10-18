// src/components/RouteMap.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = { lat: 6.9271, lng: 79.8612 }; // Default center (Colombo)

const RouteMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC3JCnqz0QDdjmQ8B-76QxGT9sZ1KFu7dY', // Replace with your key
  });

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('http://localhost:8070/Routek');
        console.log('Fetched routes:', response.data); // Log fetched data
        setRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };
    fetchRoutes();
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
      {routes.map((route) => (
        <React.Fragment key={route._id}>
          {/* Markers for start and end locations */}
          <Marker
            position={{
              lat: route.startLocation[1], // Latitude
              lng: route.startLocation[0], // Longitude
            }}
            title={`Start: ${route.routeName}`}
          />
          <Marker
            position={{
              lat: route.endLocation[1], // Latitude
              lng: route.endLocation[0], // Longitude
            }}
            title={`End: ${route.routeName}`}
          />

          {/* Polyline to show the optimized path */}
          <Polyline
            path={route.optimizedPath.map(coord => ({
              lat: coord[1], // Latitude
              lng: coord[0], // Longitude
            }))}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
            }}
          />
        </React.Fragment>
      ))}
    </GoogleMap>
  );
};

export default RouteMap;
