import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 6.9271, lng: 79.8612 }; // Colombo, Sri Lanka

const MapSelector = ({ onSelectStart, onSelectEnd, onSelectPath, bins }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC3JCnqz0QDdjmQ8B-76QxGT9sZ1KFu7dY", // Replace with your key
  });

  const [startLocation, setStartLocation] = useState(null);
  const [endLocation, setEndLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  // Calculate route using the Directions API
  const calculateRoute = useCallback(() => {
    if (startLocation && endLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: { lat: startLocation[1], lng: startLocation[0] },
          destination: { lat: endLocation[1], lng: endLocation[0] },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          console.log("Directions API status:", status); // Log the status
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            // Extract optimized path and distance
            const optimizedPath = result.routes[0].overview_path.map(
              (point) => [point.lng(), point.lat()]
            );
            const totalDistance = result.routes[0].legs[0].distance.value / 1000; // Convert to km

            // Pass path and distance to parent component
            onSelectPath(optimizedPath, totalDistance);
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [startLocation, endLocation, onSelectPath]);

  // Handle map clicks for selecting start and end locations
  const handleMapClick = useCallback(
    (event) => {
      if (!startLocation) {
        const location = [event.latLng.lng(), event.latLng.lat()];
        setStartLocation(location);
        onSelectStart(location);
      } else if (!endLocation) {
        const location = [event.latLng.lng(), event.latLng.lat()];
        setEndLocation(location);
        onSelectEnd(location);
        calculateRoute(); // Calculate the route when both points are set
      }
    },
    [startLocation, endLocation, onSelectStart, onSelectEnd, calculateRoute]
  );

  // Reset locations and directions
  const resetLocations = () => {
    setStartLocation(null);
    setEndLocation(null);
    setDirections(null);
    onSelectStart(null);
    onSelectEnd(null);
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onClick={handleMapClick}
      >
        {/* Render markers for trash bins */}
        {bins.map((bin) => (
          <Marker
            key={bin._id}
            position={{ lat: bin.location.coordinates[1], lng: bin.location.coordinates[0] }}
            icon={{ url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
          />
        ))}

        {/* Start and End Markers */}
        {startLocation && (
          <Marker position={{ lat: startLocation[1], lng: startLocation[0] }} label="S" />
        )}
        {endLocation && (
          <Marker position={{ lat: endLocation[1], lng: endLocation[0] }} label="E" />
        )}

        {/* Render the route */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <button className="btn btn-secondary mt-2" onClick={resetLocations}>
        Reset Start and End Locations
      </button>
    </div>
  );
};

export default MapSelector;
