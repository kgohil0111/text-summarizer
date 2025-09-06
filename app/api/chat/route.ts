import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY!);

export async function POST(req: Request) {
  const { message } = await req.json();

  // Call Hugging Face Inference API (chat model)
  const response = await hf.chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2", // small open-source chat model
    messages: [
      { role: "user", content: message }
    ],
    max_tokens: 200,
  });

  return new Response(
    JSON.stringify({ reply: response.choices[0].message.content }),
    { status: 200 }
  );
}
