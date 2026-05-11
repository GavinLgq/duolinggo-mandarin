import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import {
  ensureUser,
  getStreak,
  getUser,
  saveQuiz,
  setHskLevel,
  setReminder,
} from "./db.js";
import { generateQuiz } from "./quiz.js";
import { postQuiz } from "./quizPoster.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("streak")
    .setDescription("Lihat streak harian dan total sesi latihan kamu"),
  new SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Mulai quiz Mandarin sesuai level HSK kamu")
    .addStringOption((o) =>
      o
        .setName("topik")
        .setDescription("Fokus topik (opsional), mis. 'angka' atau 'makanan'")
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName("level")
    .setDescription("Atur level HSK kamu (1-6)")
    .addIntegerOption((o) =>
      o
        .setName("hsk")
        .setDescription("Level HSK")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(6),
    ),
  new SlashCommandBuilder()
    .setName("remind")
    .setDescription("Aktif/matikan reminder harian")
    .addStringOption((o) =>
      o
        .setName("status")
        .setDescription("on / off")
        .setRequired(true)
        .addChoices({ name: "on", value: "on" }, { name: "off", value: "off" }),
    ),
].map((c) => c.toJSON());

export async function handleInteraction(
  interaction: ChatInputCommandInteraction,
): Promise<void> {
  const userId = interaction.user.id;
  ensureUser(userId);

  switch (interaction.commandName) {
    case "streak": {
      const s = getStreak(userId);
      await interaction.reply({
        content:
          `🔥 **Streak:** ${s.currentStreak} hari\n` +
          `📚 **Total sesi:** ${s.totalSessions}\n` +
          `📅 **Terakhir latihan:** ${s.lastPracticed ?? "belum pernah"}`,
        ephemeral: true,
      });
      return;
    }
    case "level": {
      const level = interaction.options.getInteger("hsk", true);
      setHskLevel(userId, level);
      await interaction.reply({
        content: `✅ Level di-set ke **HSK${level}**.`,
        ephemeral: true,
      });
      return;
    }
    case "remind": {
      const status = interaction.options.getString("status", true);
      setReminder(userId, status === "on");
      await interaction.reply({
        content:
          status === "on"
            ? "🔔 Reminder harian aktif (default jam 19:00 WIB)."
            : "🔕 Reminder harian dimatikan.",
        ephemeral: true,
      });
      return;
    }
    case "quiz": {
      await interaction.deferReply();
      const hint = interaction.options.getString("topik") ?? undefined;
      const level = getUser(userId)?.hsk_level ?? 1;
      try {
        const spec = await generateQuiz(level, hint);
        const quizId = saveQuiz(userId, spec);
        await interaction.editReply(
          `Quiz HSK${level} siap${hint ? ` (topik: ${hint})` : ""}! 👇`,
        );
        if (interaction.channel) await postQuiz(interaction.channel, quizId);
      } catch (err) {
        console.error("quiz error", err);
        await interaction.editReply(
          "Gagal generate quiz, coba lagi sebentar ya.",
        );
      }
      return;
    }
  }
}
