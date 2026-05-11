# Duolinggo Mandarin — Discord Bot

Agentic Discord bot: tutor Mandarin via DM dengan tracking streak harian.

## Stack
- **discord.js** v14 — Gateway client
- **@anthropic-ai/sdk** — agent loop dengan tool use + prompt caching
- **better-sqlite3** — storage lokal (users, messages, sessions)
- **tsx** — runtime TypeScript

## Setup

1. **Buat Discord application** di https://discord.com/developers/applications
   - Bikin bot, copy token → `DISCORD_TOKEN`
   - Aktifkan **Message Content Intent** di tab Bot
   - Invite ke server pakai scope `bot` + permission `Send Messages`, `Read Message History`

2. **Konfigurasi env**
   ```bash
   cp .env.example .env
   # isi DISCORD_TOKEN, DISCORD_CLIENT_ID, ANTHROPIC_API_KEY
   ```

3. **Install & jalan**
   ```bash
   npm install
   npm run dev
   ```

## Cara pakai

**Chat:**
- DM bot → langsung tutor Mandarin
- Di server → mention bot (`@BotName halo`)

**Slash commands:**
- `/streak` — lihat streak harian & total sesi
- `/quiz [topik]` — drill multiple choice sesuai level HSK (opsional fokus topik)
- `/level <1-6>` — set level HSK
- `/remind <on|off>` — aktif/matikan reminder DM harian

**Quiz interaktif:** Bot post embed + reaction 1️⃣2️⃣3️⃣4️⃣. Klik reaction untuk jawab — bot otomatis koreksi & catat sebagai sesi latihan (kontribusi ke streak).

**Reminder harian:** Cron tiap jam, cek user yang `reminder_enabled=1` dan belum latihan hari ini di jam preferensi mereka (default 19:00 WIB / UTC+7).

## Setup pertama kali

```bash
cp .env.example .env  # isi token + API key
npm install
npm run deploy-commands   # register slash commands (sekali aja, atau saat ada perubahan)
npm run dev
```

> Slash commands global butuh ~1 jam propagasi pertama kali. Untuk dev cepat bisa pakai guild commands (lihat docs discord.js).

## Arsitektur

```
src/
├── index.ts          — Discord client, message handler, reaction handler
├── agent.ts          — Claude tool-use loop (max 5 step), prompt caching
├── tools.ts          — record_practice, get_streak, start_quiz
├── quiz.ts           — Quiz generator (Claude JSON output)
├── quizPoster.ts     — Render quiz embed + add reactions
├── commands.ts       — Slash command definitions & handlers
├── deploy-commands.ts— One-shot script: register global slash commands
├── scheduler.ts      — node-cron: hourly reminder DM
├── db.ts             — SQLite schema + helpers
└── config.ts         — env validation (zod)
```

**Agent loop:** message → history → Claude w/ tools → kalau `stop_reason=tool_use`, jalanin tool, ulangi. Side effects (mis. quiz post) di-collect di array, dieksekusi setelah teks dikirim.

**Storage tables:** `users` (level + reminder prefs), `messages` (history), `sessions` (per-day streak), `quizzes` (Q/A history).
