"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

type Farm = {
  farm_id: number;
  latitude: number;
  longitude: number;
};

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[600px] items-center justify-center text-slate-500">
      Loading map...
    </div>
  ),
});

export default function GISPage() {
  const [farm, setFarm] = useState<Farm | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/farms/1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load farm location");
        }
        return response.json();
      })
      .then((data: Farm) => setFarm(data))
      .catch(() => setError("Unable to load farm location."));
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
        <h1 className="text-2xl font-bold">GIS Map</h1>
        <p className="mt-4 text-red-600">{error}</p>
      </main>
    );
  }

  if (!farm) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
        <h1 className="text-2xl font-bold">GIS Map</h1>
        <p className="mt-4 text-slate-500">Loading farm location...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm text-slate-500">Officer Portal</p>
        <h1 className="mt-1 text-2xl font-bold">GIS Map</h1>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <MapView farm={farm} />
        </div>
      </div>
    </main>
  );
}