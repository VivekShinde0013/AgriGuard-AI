"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const stats = [
  {
    label: "Total Cases",
    value: "128",
    change: "+12 this week",
    icon: "📋",
  },
  {
    label: "High Risk",
    value: "24",
    change: "Needs attention",
    icon: "⚠️",
  },
  {
    label: "Pending Validation",
    value: "17",
    change: "Awaiting expert review",
    icon: "🔍",
  },
  {
    label: "Resolved Cases",
    value: "87",
    change: "+8 this week",
    icon: "✅",
  },
];

const recentCases = [
  {
    id: "AG-1024",
    crop: "Tomato",
    disease: "Early Blight",
    location: "Nashik",
    risk: "High",
    status: "Pending",
  },
  {
    id: "AG-1023",
    crop: "Tomato",
    disease: "Late Blight",
    location: "Pune",
    risk: "High",
    status: "Under Review",
  },
  {
    id: "AG-1022",
    crop: "Tomato",
    disease: "Leaf Mold",
    location: "Satara",
    risk: "Medium",
    status: "Validated",
  },
  {
    id: "AG-1021",
    crop: "Tomato",
    disease: "Healthy",
    location: "Ahmednagar",
    risk: "Low",
    status: "Validated",
  },
];

export default function Home() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl">
                🌱
              </div>
              <div>
                <h1 className="text-lg font-bold">AgriGuard AI</h1>
                <p className="text-xs text-slate-500">Officer Portal</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-5">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>

            {[
              { name: "Dashboard", icon: "📊" },
              { name: "Cases", icon: "📋" },
              { name: "Validation Queue", icon: "🔍" },
              { name: "GIS Map", icon: "🗺️" },
              { name: "Analytics", icon: "📈" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setActiveNav(item.name);
                  if (item.name === "Cases") {
                    router.push("/cases");
                  }
                }}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${activeNav === item.name
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}

            <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              System
            </p>

            {[
              { name: "Notifications", icon: "🔔" },
              { name: "Settings", icon: "⚙️" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${activeNav === item.name
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:bg-slate-50"
                  }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                O
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Agriculture Officer</p>
                <p className="truncate text-xs text-slate-500">Maharashtra</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <div>
                <p className="text-sm text-slate-500">Officer Portal</p>
                <h2 className="text-xl font-bold md:text-2xl">
                  {activeNav}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative rounded-lg border border-slate-200 p-2 hover:bg-slate-50">
                  🔔
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold">Officer</p>
                  <p className="text-xs text-slate-500">District Agriculture Office</p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                  O
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard */}
          <div className="space-y-6 p-5 md:p-8">
            {/* Welcome */}
            <section>
              <h3 className="text-lg font-semibold">
                Welcome back, Officer 👋
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Monitor crop disease reports, risks and validation activity.
              </p>
            </section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className="rounded-lg bg-slate-100 p-2 text-xl">
                      {stat.icon}
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500">{stat.change}</p>
                </div>
              ))}
            </section>

            {/* Risk overview + quick actions */}
            <section className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Risk Overview</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      Current reported disease risk
                    </p>
                  </div>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                    Live Overview
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-red-50 p-4">
                    <p className="text-sm text-red-700">High Risk</p>
                    <p className="mt-2 text-2xl font-bold text-red-700">24</p>
                    <div className="mt-3 h-2 rounded-full bg-red-100">
                      <div className="h-2 w-3/5 rounded-full bg-red-500" />
                    </div>
                  </div>

                  <div className="rounded-lg bg-amber-50 p-4">
                    <p className="text-sm text-amber-700">Medium Risk</p>
                    <p className="mt-2 text-2xl font-bold text-amber-700">41</p>
                    <div className="mt-3 h-2 rounded-full bg-amber-100">
                      <div className="h-2 w-2/3 rounded-full bg-amber-500" />
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-sm text-green-700">Low Risk</p>
                    <p className="mt-2 text-2xl font-bold text-green-700">63</p>
                    <div className="mt-3 h-2 rounded-full bg-green-100">
                      <div className="h-2 w-4/5 rounded-full bg-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold">Quick Actions</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Frequently used officer actions
                </p>

                <div className="mt-5 space-y-3">
                  <button className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-3 text-left text-sm font-medium hover:bg-slate-50">
                    <span>📋</span>
                    View All Cases
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-3 text-left text-sm font-medium hover:bg-slate-50">
                    <span>🔍</span>
                    Review Validations
                  </button>

                  <button className="flex w-full items-center gap-3 rounded-lg border border-slate-200 p-3 text-left text-sm font-medium hover:bg-slate-50">
                    <span>🗺️</span>
                    Open GIS Map
                  </button>
                </div>
              </div>
            </section>

            {/* Recent cases */}
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h3 className="font-semibold">Recent Disease Reports</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Latest cases submitted for officer review
                  </p>
                </div>

                <button className="text-sm font-medium text-green-700 hover:text-green-800">
                  View all →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-6 py-3">Case ID</th>
                      <th className="px-6 py-3">Crop</th>
                      <th className="px-6 py-3">Disease</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Risk</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {recentCases.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium">{item.id}</td>
                        <td className="px-6 py-4">{item.crop}</td>
                        <td className="px-6 py-4">{item.disease}</td>
                        <td className="px-6 py-4">{item.location}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.risk === "High"
                              ? "bg-red-50 text-red-700"
                              : item.risk === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-green-50 text-green-700"
                              }`}
                          >
                            {item.risk}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}