"use client";

import { useEffect, useState } from "react";

type TTSLanguage = "en" | "mr" | "hi";

interface SpeakButtonProps {
  text: string;
  language: TTSLanguage;
}

const LOCALES: Record<TTSLanguage, string> = {
  en: "en-IN",
  mr: "mr-IN",
  hi: "hi-IN",
};

export default function SpeakButton({
  text,
  language,
}: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = () => {
    if (!text.trim()) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LOCALES[language];

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={speak}
        disabled={speaking}
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {speaking ? "Speaking..." : "?? Listen"}
      </button>

      {speaking && (
        <button
          type="button"
          onClick={stop}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Stop
        </button>
      )}
    </div>
  );
}
