import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HUGGING_FACE_API_KEY!);

export async function POST(req: Request) {
  const { message } = await req.json();

  // Call Hugging Face Inference API (chat model)
  const response = await hf.chatCompletion({
    provider: "groq",
    model: "openai/gpt-oss-120b",
    messages: [{ role: "user", content: message }],
    max_tokens: 200,
  });

  return new Response(
    JSON.stringify({ reply: response.choices[0].message.content }),
    { status: 200 }
  );
}
