"use client";

import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

type Farm = {
  farm_id: number;
  latitude: number;
  longitude: number;
};

type DemoFarm = {
  farm_id: number;
  latitude: number;
  longitude: number;
  crop: string;
  risk: string;
  color: string;
};

type MapViewProps = {
  farm: Farm;
};

const demoFarms: DemoFarm[] = [
  {
    farm_id: 2,
    latitude: 31.228,
    longitude: 75.758,
    crop: "Tomato",
    risk: "Low Risk",
    color: "#16a34a",
  },
  {
    farm_id: 3,
    latitude: 31.231,
    longitude: 75.784,
    crop: "Tomato",
    risk: "Low Risk",
    color: "#eab308",
  },
  {
    farm_id: 4,
    latitude: 31.218,
    longitude: 75.795,
    crop: "Tomato",
    risk: "High Risk",
    color: "#dc2626",
  },
  {
    farm_id: 5,
    latitude: 31.211,
    longitude: 75.775,
    crop: "Tomato",
    risk: "Medium Risk",
    color: "#f97316",
  },
  {
    farm_id: 6,
    latitude: 31.205,
    longitude: 75.792,
    crop: "Tomato",
    risk: "Healthy",
    color: "#16a34a",
  },
];

function createFarmIcon(color: string, selected = false) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 30px;
        height: 30px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.35);
        ${selected ? "outline: 3px solid rgba(37, 99, 235, 0.25);" : ""}
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 7px;
          left: 7px;
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
}

export default function MapView({ farm }: MapViewProps) {
  const position: [number, number] = [
    farm.latitude,
    farm.longitude,
  ];

  return (
    <div className="relative">
      {/* Demo legend */}
      <div className="absolute left-4 top-4 z-[1000] w-56 rounded-xl bg-white p-4 shadow-lg">
        <h2 className="text-base font-bold text-slate-900">
          Farm Legend
        </h2>

        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-600" />
            Healthy / Low Risk
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            Low Risk
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-500" />
            Medium Risk
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-600" />
            High Risk
          </div>

          <div className="mt-3 border-t pt-3 text-xs text-slate-500">
            Total Farms (Demo): 6
          </div>
        </div>
      </div>

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

        {/* Real farm from Farm API */}
        <Marker
          position={position}
          icon={createFarmIcon("#2563eb", true)}
        >
          <Popup>
            <strong>Farm #{farm.farm_id}</strong>
            <br />
            <strong>Live Farm Location</strong>
            <br />
            Latitude: {farm.latitude}
            <br />
            Longitude: {farm.longitude}
            <br />
            <span style={{ color: "#2563eb" }}>
              Source: Farm API
            </span>
          </Popup>
        </Marker>

        {/* Additional demo farms */}
        {demoFarms.map((demoFarm) => (
          <Marker
            key={demoFarm.farm_id}
            position={[demoFarm.latitude, demoFarm.longitude]}
            icon={createFarmIcon(demoFarm.color)}
          >
            <Popup>
              <strong>Farm #{demoFarm.farm_id}</strong>
              <br />
              Crop: {demoFarm.crop}
              <br />
              Status: {demoFarm.risk}
              <br />
              Latitude: {demoFarm.latitude}
              <br />
              Longitude: {demoFarm.longitude}
              <br />
              <span style={{ color: "#64748b" }}>
                Demo location
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Demo notice */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000] rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800 shadow">
        <strong>Demo view:</strong> Farm #1 is loaded from the Farm API.
        The other 5 farm markers are demonstration locations for the
        officer GIS interface.
      </div>
    </div>
  );
}