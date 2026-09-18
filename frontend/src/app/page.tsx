"use client";

import ImageUploader from "@/components/ImageUploader";

export default function Home() {
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
            <h3 className="mt-2 text-xl font-semibold">Awaiting Scan</h3>
            <p className="mt-2 text-sm text-slate-600">Upload an image to check crop health</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Risk Status</p>
            <h3 className="mt-2 text-xl font-semibold">Not Available</h3>
            <p className="mt-2 text-sm text-slate-600">Risk assessment will appear here</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Disease Detection</h3>
            <p className="mt-2 text-slate-600">
              Upload a tomato leaf image to detect possible diseases.
            </p>

            <ImageUploader />
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">Farm Insights</h3>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Weather</p>
                <p className="mt-1 font-medium">Weather data will appear here</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Disease Risk</p>
                <p className="mt-1 font-medium">Risk assessment will appear here</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Advisory</p>
                <p className="mt-1 font-medium">Agricultural advisory will appear here</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}