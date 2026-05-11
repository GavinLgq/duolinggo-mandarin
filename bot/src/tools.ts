import type Anthropic from "@anthropic-ai/sdk";
import { getStreak, recordPractice } from "./db.js";

export const toolDefinitions: Anthropic.Tool[] = [
  {
    name: "record_practice",
    description:
      "Record that the user practiced today. Call this AT MOST ONCE per response, only when the user has produced Mandarin (hanzi or pinyin) or genuinely engaged with a tutoring exchange. Do not call for greetings or off-topic chatter.",
    input_schema: {
      type: "object",
      properties: {
        summary: {
          type: "string",
          description:
            "One short sentence describing what was practiced (e.g., 'Greetings + self-introduction at HSK1 level').",
        },
      },
      required: ["summary"],
    },
  },
  {
    name: "get_streak",
    description:
      "Get the user's current daily streak, total practice sessions, and last practiced date. Use when the user asks about progress, streak, or stats.",
    input_schema: { type: "object", properties: {} },
  },
];

export function runTool(
  name: string,
  input: Record<string, unknown>,
  discordId: string,
): string {
  switch (name) {
    case "record_practice": {
      const summary = String(input.summary ?? "").slice(0, 200);
      recordPractice(discordId, summary);
      const s = getStreak(discordId);
      return JSON.stringify({
        ok: true,
        currentStreak: s.currentStreak,
        totalSessions: s.totalSessions,
      });
    }
    case "get_streak": {
      return JSON.stringify(getStreak(discordId));
    }
    default:
      return JSON.stringify({ error: `unknown tool: ${name}` });
  }
}
