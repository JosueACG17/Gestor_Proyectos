import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapaCancun = () => {
  const center = [21.1619, -86.8515]; // Coordenadas de Cancún

  return (
    <MapContainer center={center} zoom={13} style={{ height: '300px', borderRadius: '10px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />
      <Marker position={center}>
        <Popup>¡Bienvenido a Cancún!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapaCancun;
