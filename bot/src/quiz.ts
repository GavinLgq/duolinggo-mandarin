import Anthropic from "@anthropic-ai/sdk";
import { config } from "./config.js";
import type { QuizSpec } from "./db.js";

const client = new Anthropic({ apiKey: config.ANTHROPIC_API_KEY });

const QUIZ_SYSTEM = `Kamu menghasilkan ONE multiple-choice quiz Mandarin untuk pelajar Indonesia.
Output HARUS JSON valid (tanpa markdown code fence) dengan schema:
{
  "question": string,    // pertanyaan dalam bahasa Indonesia, jelas, singkat
  "options": string[],   // 4 opsi, masing-masing format "汉字 (pīnyīn) — arti"
  "correctIndex": number,// 0-3
  "explanation": string  // 1-2 kalimat kenapa jawabannya benar + jebakan opsi lain
}
Aturan: hanya satu jawaban benar, distractor harus plausibel (mirip arti/bunyi/karakter).`;

export async function generateQuiz(
  hskLevel: number,
  topicHint?: string,
): Promise<QuizSpec> {
  const userPrompt = `Buat 1 quiz untuk level HSK${hskLevel}.${
    topicHint ? ` Topik/fokus: ${topicHint}.` : ""
  } Hanya output JSON.`;

  const res = await client.messages.create({
    model: config.ANTHROPIC_MODEL,
    max_tokens: 512,
    system: [
      { type: "text", text: QUIZ_SYSTEM, cache_control: { type: "ephemeral" } },
    ],
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`quiz generator returned no JSON: ${text}`);

  const parsed = JSON.parse(jsonMatch[0]) as QuizSpec;
  if (
    typeof parsed.question !== "string" ||
    !Array.isArray(parsed.options) ||
    parsed.options.length !== 4 ||
    typeof parsed.correctIndex !== "number" ||
    parsed.correctIndex < 0 ||
    parsed.correctIndex > 3
  ) {
    throw new Error(`quiz generator returned malformed spec: ${text}`);
  }
  return parsed;
}

export const QUIZ_EMOJIS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣"] as const;

export function emojiToIndex(emoji: string): number {
  return QUIZ_EMOJIS.indexOf(emoji as (typeof QUIZ_EMOJIS)[number]);
}
