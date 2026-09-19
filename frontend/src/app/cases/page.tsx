"use client";

const cases = [
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

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm text-slate-500">Officer Portal</p>
          <h1 className="text-2xl font-bold">Cases</h1>
        </div>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Disease Reports</h2>
              <p className="mt-1 text-sm text-slate-500">
                Review reported crop disease cases.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Demo Data
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Case ID</th>
                    <th className="px-5 py-3 font-semibold">Crop</th>
                    <th className="px-5 py-3 font-semibold">Disease</th>
                    <th className="px-5 py-3 font-semibold">Location</th>
                    <th className="px-5 py-3 font-semibold">Risk</th>
                    <th className="px-5 py-3 font-semibold">Status</th>
                    <th className="px-5 py-3 font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {cases.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium">{item.id}</td>
                      <td className="px-5 py-4">{item.crop}</td>
                      <td className="px-5 py-4">{item.disease}</td>
                      <td className="px-5 py-4">{item.location}</td>
                      <td className="px-5 py-4">{item.risk}</td>
                      <td className="px-5 py-4">{item.status}</td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() =>
                            window.alert(
                              `Case ID: ${item.id}\nCrop: ${item.crop}\nDisease: ${item.disease}\nLocation: ${item.location}\nRisk: ${item.risk}\nStatus: ${item.status}`
                            )
                          }
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Demonstration data — backend integration pending.
          </p>
        </section>
      </div>
    </main>
  );
}
