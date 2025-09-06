"use client"

import { useState } from "react"

export default function TextSummarizerPage() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to summarize")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      })

      if (!response.ok) {
        throw new Error("Failed to summarize text")
      }

      const data = await response.json()
      setSummary(data.summary)
    } catch (err) {
      setError("Failed to summarize text. Please try again.")
      console.error("Summarization error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (summary) {
      await navigator.clipboard.writeText(summary)
      alert("Summary copied to clipboard!")
    }
  }

  const handleClear = () => {
    setInputText("")
    setSummary("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">AI Text Summarizer</h1>
          <p className="text-gray-600 mt-2">Transform your text with AI-powered summarization (Hugging Face Inference API Call)</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Input Text</h2>

            <textarea
              placeholder="Paste your text here to get an AI-generated summary..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-80 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">{inputText.length} characters</span>

              <div className="flex gap-3">
                <button
                  onClick={handleClear}
                  disabled={!inputText && !summary}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>

                <button
                  onClick={handleSummarize}
                  disabled={isLoading || !inputText.trim()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                >
                  {isLoading ? "Summarizing..." : "Summarize"}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
              {summary && (
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50"
                >
                  Copy
                </button>
              )}
            </div>

            {summary ? (
              <div>
                <div className="p-4 bg-gray-50 border rounded-lg h-80 overflow-y-auto">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{summary}</p>
                </div>
                <p className="text-sm text-gray-500 mt-2">{summary.length} characters</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-80 text-center border-2 border-dashed border-gray-200 rounded-lg">
                <div>
                  <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-gray-400 text-xl">✨</span>
                  </div>
                  <p className="text-gray-500">Your AI-generated summary will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">How to Use</h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-3">
                1
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Paste Your Text</h3>
              <p className="text-sm text-gray-600">Copy and paste the text you want to summarize into the input area</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-3">
                2
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Click Summarize</h3>
              <p className="text-sm text-gray-600">Press the summarize button to generate an AI-powered summary</p>
            </div>

            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold mb-3">
                3
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Copy & Use</h3>
              <p className="text-sm text-gray-600">Copy the generated summary and use it wherever you need</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
