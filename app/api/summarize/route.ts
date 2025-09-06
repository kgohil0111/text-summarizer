import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const HF_API_KEY = process.env.HUGGING_FACE_API_KEY

    if (!HF_API_KEY) {
      return NextResponse.json({ error: "Hugging Face API key not configured" }, { status: 500 })
    }

    const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: text
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 })
    }

    const result = await response.json()

    const summary = result[0]?.summary_text || result.summary_text || "Unable to generate summary"

    return NextResponse.json({ summary })
  } catch (error) {
    console.error("Summarization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
