import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  DISCORD_TOKEN: z.string().min(1),
  DISCORD_CLIENT_ID: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  DB_PATH: z.string().default("./data/bot.db"),
  ANTHROPIC_MODEL: z.string().default("claude-sonnet-4-6"),
});

export const config = schema.parse(process.env);
