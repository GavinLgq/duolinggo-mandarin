import { EmbedBuilder, type TextBasedChannel } from "discord.js";
import { attachQuizMessage, db } from "./db.js";
import { QUIZ_EMOJIS } from "./quiz.js";

export async function postQuiz(
  channel: TextBasedChannel,
  quizId: number,
): Promise<void> {
  const row = db
    .prepare(`SELECT question, options FROM quizzes WHERE id = ?`)
    .get(quizId) as { question: string; options: string } | undefined;
  if (!row) return;

  const options = JSON.parse(row.options) as string[];
  const embed = new EmbedBuilder()
    .setTitle("🀄 Quiz Mandarin")
    .setDescription(row.question)
    .addFields(
      options.map((opt, i) => ({
        name: `${QUIZ_EMOJIS[i]} Opsi ${i + 1}`,
        value: opt,
      })),
    )
    .setFooter({ text: "Klik reaction di bawah untuk menjawab" });

  if (!channel.isSendable()) return;
  const msg = await channel.send({ embeds: [embed] });
  attachQuizMessage(quizId, msg.id);
  for (const e of QUIZ_EMOJIS) await msg.react(e);
}
