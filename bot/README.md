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
- **DM bot**: langsung chat, bot akan jadi tutor Mandarin.
- **Di server**: mention bot (`@BotName halo`) untuk trigger respons.
- **Cek progress**: tanya "streak aku berapa?" — bot panggil tool `get_streak`.

## Arsitektur

```
src/
├── index.ts     — Discord client, message handler, chunk reply
├── agent.ts     — Claude tool-use loop (max 5 step), prompt caching
├── tools.ts     — record_practice, get_streak
├── db.ts        — SQLite schema + helpers (users/messages/sessions)
└── config.ts    — env validation (zod)
```

Agent loop: setiap pesan user → append history → kirim ke Claude dengan tools → kalau `stop_reason=tool_use` jalanin tool → loop. System prompt di-cache pakai `cache_control: ephemeral` untuk hemat biaya.
