"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

type Farm = {
  farm_id: number;
  latitude: number;
  longitude: number;
};

type MapViewProps = {
  farm: Farm;
};

export default function MapView({ farm }: MapViewProps) {
  const position: [number, number] = [farm.latitude, farm.longitude];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          <strong>Farm #{farm.farm_id}</strong>
          <br />
          Latitude: {farm.latitude}
          <br />
          Longitude: {farm.longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
}