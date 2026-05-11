import type { Client } from "discord.js";
import cron from "node-cron";
import { getStreak, usersDueForReminder } from "./db.js";

export function startScheduler(client: Client): void {
  cron.schedule("0 * * * *", async () => {
    const utcHour = new Date().getUTCHours();
    const due = usersDueForReminder(utcHour);
    if (due.length === 0) return;

    console.log(`Sending reminders to ${due.length} user(s) at UTC ${utcHour}`);
    for (const u of due) {
      try {
        const user = await client.users.fetch(u.discord_id);
        const s = getStreak(u.discord_id);
        const streakLine =
          s.currentStreak > 0
            ? `🔥 Streak kamu sekarang **${s.currentStreak} hari** — jangan sampai putus!`
            : "Yuk mulai streak hari ini! Balas pesan ini untuk latihan singkat.";
        await user.send(
          `Halo! Belum latihan Mandarin hari ini nih. ${streakLine}\n\nKetik apa aja di sini, atau pakai \`/quiz\` di server untuk drill cepat.`,
        );
      } catch (err) {
        console.error(`reminder failed for ${u.discord_id}`, err);
      }
    }
  });
  console.log("Scheduler started (hourly check).");
}
