"use client";

import { useEffect, useState } from "react";
import ImageUploader, { type PredictionResponse } from "@/components/ImageUploader";

type WeatherResponse = {
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  rainfall: number | null;
  wind_speed: number;
  weather_condition: string;
};

type RiskResponse = {
  disease: string;
  risk_level: string;
  risk_factors: string[];
  basis: string;
};

export default function Home() {
  const [scanResult, setScanResult] = useState<PredictionResponse | null>(null);
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [risk, setRisk] = useState<RiskResponse | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "http://192.168.134.13:8000/weather?lat=31.224&lon=75.7708"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather");
        }

        const data: WeatherResponse = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    fetchWeather();
  }, []);

  const handleScanResult = (result: PredictionResponse) => {
    setScanResult(result);
    setRisk(null);
  };

  useEffect(() => {
    if (!scanResult || !weather) {
      return;
    }

    const fetchRisk = async () => {
      try {
        const response = await fetch("http://192.168.134.13:8000/risk", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prediction: {
              disease: scanResult.disease,
            },
            weather: {
              temperature: weather.temperature,
              humidity: weather.humidity,
              rainfall: weather.rainfall,
            },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch risk");
        }

        const data: RiskResponse = await response.json();
        setRisk(data);
      } catch (error) {
        console.error("Risk fetch error:", error);
      }
    };

    fetchRisk();
  }, [scanResult, weather]);

  const scanned = scanResult !== null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-green-700">AgriGuard AI</h1>
            <p className="text-sm text-slate-500">
              Smart crop health management
            </p>
          </div>

          <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Farmer
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Farmer Dashboard</h2>
          <p className="mt-2 text-slate-600">
            Monitor your crops, detect diseases and receive timely advisories.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active Farm</p>
            <h3 className="mt-2 text-xl font-semibold">My Farm</h3>
            <p className="mt-2 text-sm text-slate-600">Tomato crop</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Crop Health</p>
            <h3 className="mt-2 text-xl font-semibold">
              {scanned ? "Disease Detected" : "Awaiting Scan"}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {scanned
                ? "Scan completed successfully"
                : "Upload an image to check crop health"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Risk Status</p>

            <h3 className="mt-2 text-xl font-semibold">
              {risk
                ? risk.risk_level.replaceAll("_", " ")
                : "Not Available"}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {risk
                ? "Based on disease and current weather conditions"
                : "Risk assessment will appear here"}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Disease Detection</h3>

            <p className="mt-2 text-slate-600">
              Upload a tomato leaf image to detect possible diseases.
            </p>

            <ImageUploader onScanResult={handleScanResult} />
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Farm Insights</h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Weather</p>

                {weather ? (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Temperature</p>
                      <p className="font-semibold">
                        {weather.temperature}°C
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Humidity</p>
                      <p className="font-semibold">
                        {weather.humidity}%
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Rainfall</p>
                      <p className="font-semibold">
                        {weather.rainfall !== null
                          ? `${weather.rainfall} mm`
                          : "Unavailable"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Wind</p>
                      <p className="font-semibold">
                        {weather.wind_speed.toFixed(2)} km/h
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 font-medium">
                    Weather data will appear here
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Disease Risk</p>

                {scanned && risk ? (
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-orange-600">
                          {risk.risk_level
                            .replaceAll("_", " ")
                            .toUpperCase()}
                        </p>

                        <p className="mt-1 font-medium text-slate-900">
                          {scanResult.display_name}
                        </p>
                      </div>

                      <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                        {scanResult.confidence_percent}%
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-600">
                        Risk Factors
                      </p>

                      <div className="mt-2 space-y-1 text-sm text-slate-600">
                        {risk.risk_factors.map((factor, index) => (
                          <p key={index}>• {factor}</p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-orange-50 p-3">
                      <p className="text-sm font-medium text-orange-700">
                        Assessment Basis
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {risk.basis}
                      </p>
                    </div>
                  </div>
                ) : scanned ? (
                  <p className="mt-1 font-medium">
                    Calculating risk assessment...
                  </p>
                ) : (
                  <p className="mt-1 font-medium">
                    Risk assessment will appear here
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Advisory</p>

                <p className="mt-1 font-medium">
                  {scanned
                    ? "Monitor affected leaves and maintain proper field ventilation."
                    : "Agricultural advisory will appear here"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}