"use client";
import { useState } from "react";

type SentimentResult = {
  label: string;
  score: number;
};

export default function SentimentPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">📝 Sentiment Analysis</h1>
      <p>( model distilbert-base-uncased-finetuned-sst-2-english with hf-inference provider )</p>
      <textarea
        className="mt-8 w-full max-w-lg border rounded-lg p-2 mb-4 h-32 outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your text here..."
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        onClick={analyzeSentiment}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>

      {result && (
        <div className="mt-6 w-full max-w-lg bg-white p-4 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Result</h2>
          <p>
            <strong>Label:</strong> {result.label}
          </p>
          <p>
            <strong>Confidence:</strong> {(result.score * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}
