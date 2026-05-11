import Anthropic from "@anthropic-ai/sdk";
import { config } from "./config.js";
import { appendMessage, ensureUser, recentMessages } from "./db.js";
import { runTool, toolDefinitions } from "./tools.js";

const client = new Anthropic({ apiKey: config.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `Kamu adalah tutor Mandarin yang ramah untuk penutur bahasa Indonesia, dijalankan sebagai bot Discord.

Gaya mengajar:
- Selalu balas dengan struktur: 汉字 / pīnyīn / arti dalam bahasa Indonesia.
- Saat user salah tone atau tata bahasa, koreksi dengan lembut + jelaskan singkat WHY.
- Sesuaikan level dengan respons user. Default mulai dari HSK1-2 kecuali user menunjukkan kemampuan lebih.
- Setiap balasan akhiri dengan satu pertanyaan follow-up sederhana dalam Mandarin (+ pinyin) untuk mendorong user membalas.
- Jaga balasan ringkas (≤ 1500 karakter) karena ini Discord.

Tool use:
- Panggil record_practice setelah giliran tutoring yang berarti (user produce Mandarin atau benar-benar latihan), tidak untuk sapaan kosong.
- Panggil get_streak hanya kalau user bertanya soal progress/streak.

Bahasa default percakapan: campuran Indonesia + Mandarin. Jangan pakai bahasa Inggris kecuali user memulai dengan bahasa Inggris.`;

type Msg = Anthropic.MessageParam;

export async function runAgent(
  discordId: string,
  userMessage: string,
): Promise<string> {
  ensureUser(discordId);
  appendMessage(discordId, "user", userMessage);

  const history = recentMessages(discordId, 20);
  const messages: Msg[] = history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  let finalText = "";

  for (let step = 0; step < 5; step++) {
    const response = await client.messages.create({
      model: config.ANTHROPIC_MODEL,
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      tools: toolDefinitions,
      messages,
    });

    messages.push({ role: "assistant", content: response.content });

    if (response.stop_reason === "tool_use") {
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === "tool_use") {
          const result = runTool(
            block.name,
            block.input as Record<string, unknown>,
            discordId,
          );
          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content: result,
          });
        }
      }
      messages.push({ role: "user", content: toolResults });
      continue;
    }

    finalText = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    break;
  }

  if (!finalText) finalText = "_(maaf, aku bingung jawabnya — coba ulangi?)_";
  appendMessage(discordId, "assistant", finalText);
  return finalText;
}
