import {
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  type MessageReaction,
  Partials,
  type PartialMessageReaction,
  type PartialUser,
  type User,
} from "discord.js";
import { runAgent } from "./agent.js";
import { handleInteraction } from "./commands.js";
import { config } from "./config.js";
import {
  answerQuiz,
  appendMessage,
  ensureUser,
  getQuizByMessage,
  recordPractice,
} from "./db.js";
import { emojiToIndex } from "./quiz.js";
import { postQuiz } from "./quizPoster.js";
import { startScheduler } from "./scheduler.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
  startScheduler(c);
});

const DISCORD_LIMIT = 2000;

function chunk(text: string, size = DISCORD_LIMIT): string[] {
  const parts: string[] = [];
  for (let i = 0; i < text.length; i += size) parts.push(text.slice(i, i + size));
  return parts;
}

client.on(Events.MessageCreate, async (msg) => {
  if (msg.author.bot) return;

  const isDM = msg.channel.type === ChannelType.DM;
  const mentioned = msg.mentions.users.has(client.user!.id);
  if (!isDM && !mentioned) return;

  const content = msg.content.replace(/<@!?\d+>/g, "").trim();
  if (!content) return;

  try {
    await msg.channel.sendTyping();
    const result = await runAgent(msg.author.id, content);
    for (const part of chunk(result.text)) {
      await msg.reply({ content: part, allowedMentions: { repliedUser: false } });
    }
    for (const fx of result.sideEffects) {
      if (fx.type === "quiz") await postQuiz(msg.channel, fx.quizId);
    }
  } catch (err) {
    console.error("agent error", err);
    await msg.reply("Maaf, ada error di sisi tutor. Coba lagi sebentar ya.");
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  try {
    await handleInteraction(interaction);
  } catch (err) {
    console.error("interaction error", err);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply("Ada error, coba lagi ya.");
    } else {
      await interaction.reply({ content: "Ada error, coba lagi ya.", ephemeral: true });
    }
  }
});

async function onReactionAdd(
  reaction: MessageReaction | PartialMessageReaction,
  user: User | PartialUser,
): Promise<void> {
  if (user.bot) return;
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch {
      return;
    }
  }

  const quiz = getQuizByMessage(reaction.message.id);
  if (!quiz) return;
  if (quiz.answered_at) return;
  if (quiz.discord_id !== user.id) return;

  const idx = emojiToIndex(reaction.emoji.name ?? "");
  if (idx === -1) return;

  const isCorrect = idx === quiz.correct_index;
  answerQuiz(quiz.id, isCorrect);

  ensureUser(user.id);
  recordPractice(user.id, `Quiz: ${quiz.question.slice(0, 80)}`);
  appendMessage(
    user.id,
    "user",
    `[Quiz answer] memilih opsi ${idx + 1} untuk "${quiz.question}" — ${
      isCorrect ? "BENAR" : "SALAH"
    }`,
  );

  const options = JSON.parse(quiz.options) as string[];
  const verdict = isCorrect ? "✅ **Benar!**" : "❌ **Belum tepat.**";
  const correctLine = `Jawaban benar: **Opsi ${quiz.correct_index + 1}** — ${
    options[quiz.correct_index]
  }`;
  const explanation = quiz.explanation ? `\n${quiz.explanation}` : "";
  const channel = reaction.message.channel;
  if (channel.isSendable()) {
    await channel.send(`<@${user.id}> ${verdict}\n${correctLine}${explanation}`);
  }
}

client.on(Events.MessageReactionAdd, onReactionAdd);

client.login(config.DISCORD_TOKEN);
