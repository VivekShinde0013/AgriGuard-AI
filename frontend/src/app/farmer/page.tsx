"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";

export default function Home() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  const scanned = scanResult !== null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-green-700">AgriGuard AI</h1>
            <p className="text-sm text-slate-500">Smart crop health management</p>
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
              {scanned ? "Scan completed successfully" : "Upload an image to check crop health"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Risk Status</p>
            <h3 className="mt-2 text-xl font-semibold">
              {scanned ? "Moderate Risk" : "Not Available"}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              {scanned ? "Based on current disease assessment" : "Risk assessment will appear here"}
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Disease Detection</h3>
            <p className="mt-2 text-slate-600">
              Upload a tomato leaf image to detect possible diseases.
            </p>

            <ImageUploader onScanResult={setScanResult} />
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Farm Insights</h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Weather</p>

                {scanned ? (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Temperature</p>
                      <p className="font-semibold">28┬░C</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Humidity</p>
                      <p className="font-semibold">72%</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Rainfall</p>
                      <p className="font-semibold">12 mm</p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">Wind</p>
                      <p className="font-semibold">14 km/h</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 font-medium">Weather data will appear here</p>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Disease Risk</p>

                {scanned ? (
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-orange-600">MODERATE RISK</p>
                        <p className="mt-1 font-medium text-slate-900">Early Blight</p>
                      </div>

                      <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
                        94%
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-600">Risk Factors</p>

                      <div className="mt-2 space-y-1 text-sm text-slate-600">
                        <p>ΓÇó Detected disease: Early Blight</p>
                        <p>ΓÇó Humidity: 72%</p>
                        <p>ΓÇó Recent rainfall: 12 mm</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg bg-orange-50 p-3">
                      <p className="text-sm font-medium text-orange-700">
                        Monitor crop closely
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        Regularly inspect affected leaves for disease progression.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1 font-medium">Risk assessment will appear here</p>
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
      </main >
    </div >
  );
}
