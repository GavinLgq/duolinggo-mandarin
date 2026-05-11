import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { config } from "./config.js";

mkdirSync(dirname(config.DB_PATH), { recursive: true });

export const db = new Database(config.DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    discord_id TEXT PRIMARY KEY,
    hsk_level INTEGER NOT NULL DEFAULT 1,
    reminder_enabled INTEGER NOT NULL DEFAULT 1,
    reminder_hour INTEGER NOT NULL DEFAULT 19,
    timezone_offset INTEGER NOT NULL DEFAULT 7,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT NOT NULL REFERENCES users(discord_id) ON DELETE CASCADE,
    practiced_on TEXT NOT NULL DEFAULT (date('now')),
    messages INTEGER NOT NULL DEFAULT 0,
    summary TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_sessions_user_date
    ON sessions(discord_id, practiced_on);

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT NOT NULL REFERENCES users(discord_id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK(role IN ('user','assistant')),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_messages_user_time
    ON messages(discord_id, created_at);

  CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    discord_id TEXT NOT NULL REFERENCES users(discord_id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correct_index INTEGER NOT NULL,
    explanation TEXT,
    message_id TEXT,
    answered_at TEXT,
    was_correct INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_quizzes_message ON quizzes(message_id);
  CREATE INDEX IF NOT EXISTS idx_quizzes_user ON quizzes(discord_id);
`);

for (const sql of [
  "ALTER TABLE users ADD COLUMN reminder_enabled INTEGER NOT NULL DEFAULT 1",
  "ALTER TABLE users ADD COLUMN reminder_hour INTEGER NOT NULL DEFAULT 19",
  "ALTER TABLE users ADD COLUMN timezone_offset INTEGER NOT NULL DEFAULT 7",
]) {
  try {
    db.exec(sql);
  } catch {
    // column already exists
  }
}

export function ensureUser(discordId: string): void {
  db.prepare("INSERT OR IGNORE INTO users(discord_id) VALUES (?)").run(discordId);
}

export function appendMessage(
  discordId: string,
  role: "user" | "assistant",
  content: string,
): void {
  db.prepare(
    "INSERT INTO messages(discord_id, role, content) VALUES (?, ?, ?)",
  ).run(discordId, role, content);
}

export function recentMessages(
  discordId: string,
  limit = 20,
): { role: "user" | "assistant"; content: string }[] {
  const rows = db
    .prepare(
      `SELECT role, content FROM messages
       WHERE discord_id = ?
       ORDER BY id DESC LIMIT ?`,
    )
    .all(discordId, limit) as { role: "user" | "assistant"; content: string }[];
  return rows.reverse();
}

export function recordPractice(discordId: string, summary: string): void {
  const today = db
    .prepare(
      `SELECT id, messages FROM sessions
       WHERE discord_id = ? AND practiced_on = date('now')`,
    )
    .get(discordId) as { id: number; messages: number } | undefined;

  if (today) {
    db.prepare(
      `UPDATE sessions SET messages = messages + 1, summary = ? WHERE id = ?`,
    ).run(summary, today.id);
  } else {
    db.prepare(
      `INSERT INTO sessions(discord_id, messages, summary) VALUES (?, 1, ?)`,
    ).run(discordId, summary);
  }
}

export type UserPrefs = {
  discord_id: string;
  hsk_level: number;
  reminder_enabled: number;
  reminder_hour: number;
  timezone_offset: number;
};

export function getUser(discordId: string): UserPrefs | undefined {
  return db
    .prepare(`SELECT * FROM users WHERE discord_id = ?`)
    .get(discordId) as UserPrefs | undefined;
}

export function setHskLevel(discordId: string, level: number): void {
  ensureUser(discordId);
  db.prepare(`UPDATE users SET hsk_level = ? WHERE discord_id = ?`).run(
    level,
    discordId,
  );
}

export function setReminder(discordId: string, enabled: boolean): void {
  ensureUser(discordId);
  db.prepare(`UPDATE users SET reminder_enabled = ? WHERE discord_id = ?`).run(
    enabled ? 1 : 0,
    discordId,
  );
}

export type QuizSpec = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function saveQuiz(discordId: string, q: QuizSpec): number {
  const info = db
    .prepare(
      `INSERT INTO quizzes(discord_id, question, options, correct_index, explanation)
       VALUES (?, ?, ?, ?, ?)`,
    )
    .run(
      discordId,
      q.question,
      JSON.stringify(q.options),
      q.correctIndex,
      q.explanation,
    );
  return info.lastInsertRowid as number;
}

export function attachQuizMessage(quizId: number, messageId: string): void {
  db.prepare(`UPDATE quizzes SET message_id = ? WHERE id = ?`).run(
    messageId,
    quizId,
  );
}

export type QuizRow = {
  id: number;
  discord_id: string;
  question: string;
  options: string;
  correct_index: number;
  explanation: string | null;
  message_id: string | null;
  answered_at: string | null;
  was_correct: number | null;
};

export function getQuizByMessage(messageId: string): QuizRow | undefined {
  return db
    .prepare(`SELECT * FROM quizzes WHERE message_id = ?`)
    .get(messageId) as QuizRow | undefined;
}

export function answerQuiz(quizId: number, wasCorrect: boolean): void {
  db.prepare(
    `UPDATE quizzes SET answered_at = datetime('now'), was_correct = ? WHERE id = ?`,
  ).run(wasCorrect ? 1 : 0, quizId);
}

export function usersDueForReminder(currentUtcHour: number): UserPrefs[] {
  return db
    .prepare(
      `SELECT * FROM users
       WHERE reminder_enabled = 1
         AND ((reminder_hour - timezone_offset) % 24 + 24) % 24 = ?
         AND NOT EXISTS (
           SELECT 1 FROM sessions
           WHERE sessions.discord_id = users.discord_id
             AND sessions.practiced_on = date('now')
         )`,
    )
    .all(currentUtcHour) as UserPrefs[];
}

export function getStreak(discordId: string): {
  currentStreak: number;
  totalSessions: number;
  lastPracticed: string | null;
} {
  const dates = db
    .prepare(
      `SELECT DISTINCT practiced_on FROM sessions
       WHERE discord_id = ? ORDER BY practiced_on DESC`,
    )
    .all(discordId) as { practiced_on: string }[];

  if (dates.length === 0) {
    return { currentStreak: 0, totalSessions: 0, lastPracticed: null };
  }

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const last = dates[0].practiced_on;

  let streak = 0;
  if (last === today || last === yesterday) {
    streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1].practiced_on);
      const curr = new Date(dates[i].practiced_on);
      const diffDays = Math.round(
        (prev.getTime() - curr.getTime()) / 86_400_000,
      );
      if (diffDays === 1) streak++;
      else break;
    }
  }

  const total = db
    .prepare(`SELECT COUNT(*) as c FROM sessions WHERE discord_id = ?`)
    .get(discordId) as { c: number };

  return {
    currentStreak: streak,
    totalSessions: total.c,
    lastPracticed: last,
  };
}
