import { InferenceClient } from "@huggingface/inference";

const hf = new InferenceClient(process.env.HUGGING_FACE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    // Run sentiment analysis
    const result = await hf.textClassification({
      model: "distilbert-base-uncased-finetuned-sst-2-english",
      inputs: text,
      provider: "hf-inference",
    });

    return new Response(JSON.stringify(result[0]), { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
