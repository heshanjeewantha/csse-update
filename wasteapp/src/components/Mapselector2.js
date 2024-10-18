// src/components/MapSelector.js
import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '400px' };
const center = { lat: 6.9271, lng: 79.8612 }; // Default to Colombo, Sri Lanka

const MapSelector2 = ({ onSelectLocation }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyC3JCnqz0QDdjmQ8B-76QxGT9sZ1KFu7dY', // Replace with your API key
    });

    const [marker, setMarker] = useState(null);

    const onMapClick = useCallback((event) => {
        const selectedLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
        setMarker(selectedLocation);
        onSelectLocation(selectedLocation);
    }, [onSelectLocation]);

    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={center}
            onClick={onMapClick}
        >
            {marker && <Marker position={marker} />}
        </GoogleMap>
    );
};

export default MapSelector2;
