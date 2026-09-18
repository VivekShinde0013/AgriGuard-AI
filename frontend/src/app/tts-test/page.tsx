"use client";

import SpeakButton from "@/components/tts/SpeakButton";

const tests = [
  {
    language: "en" as const,
    label: "English",
    text: "Early blight symptoms have been detected in your tomato crop.",
  },
  {
    language: "mr" as const,
    label: "Marathi",
    text: "Marathi TTS test message.",
  },
  {
    language: "hi" as const,
    label: "Hindi",
    text: "Hindi TTS test message.",
  },
];

export default function TTSTestPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-slate-900">
          AgriGuard AI - TTS Test
        </h1>

        <p className="mt-2 text-slate-600">
          Browser Text-to-Speech test for farmer advisory messages.
        </p>

        <div className="mt-8 space-y-4">
          {tests.map((test) => (
            <section
              key={test.language}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{test.label}</h2>

              <p className="mt-2 text-slate-600">{test.text}</p>

              <div className="mt-4">
                <SpeakButton
                  text={test.text}
                  language={test.language}
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
