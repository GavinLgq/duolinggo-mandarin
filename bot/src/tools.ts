import type Anthropic from "@anthropic-ai/sdk";
import { getStreak, getUser, recordPractice, saveQuiz } from "./db.js";
import { generateQuiz } from "./quiz.js";

export type SideEffect = { type: "quiz"; quizId: number };

export const toolDefinitions: Anthropic.Tool[] = [
  {
    name: "record_practice",
    description:
      "Record that the user practiced today. Call AT MOST ONCE per response, only when the user produced Mandarin or genuinely engaged with tutoring. Skip for greetings/off-topic.",
    input_schema: {
      type: "object",
      properties: {
        summary: {
          type: "string",
          description: "One short sentence describing what was practiced.",
        },
      },
      required: ["summary"],
    },
  },
  {
    name: "get_streak",
    description:
      "Get the user's current daily streak and total sessions. Use when asked about progress.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "start_quiz",
    description:
      "Generate a multiple-choice quiz at the user's current HSK level. Use when the user says they want a quiz, asks to test themselves, or when it naturally fits the tutoring flow. The quiz will be posted as a separate Discord message with reaction buttons — your text reply should briefly announce it.",
    input_schema: {
      type: "object",
      properties: {
        topic_hint: {
          type: "string",
          description:
            "Optional focus area, e.g., 'greetings', 'numbers', 'food vocabulary'.",
        },
      },
    },
  },
];

export async function runTool(
  name: string,
  input: Record<string, unknown>,
  discordId: string,
  sideEffects: SideEffect[],
): Promise<string> {
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
    case "get_streak":
      return JSON.stringify(getStreak(discordId));
    case "start_quiz": {
      const user = getUser(discordId);
      const level = user?.hsk_level ?? 1;
      const hint =
        typeof input.topic_hint === "string" ? input.topic_hint : undefined;
      try {
        const spec = await generateQuiz(level, hint);
        const quizId = saveQuiz(discordId, spec);
        sideEffects.push({ type: "quiz", quizId });
        return JSON.stringify({
          ok: true,
          message:
            "Quiz prepared. It will be posted as a separate message after your reply.",
        });
      } catch (err) {
        return JSON.stringify({
          ok: false,
          error: err instanceof Error ? err.message : "quiz generation failed",
        });
      }
    }
    default:
      return JSON.stringify({ error: `unknown tool: ${name}` });
  }
}
