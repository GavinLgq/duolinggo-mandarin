import {
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";
import { runAgent } from "./agent.js";
import { config } from "./config.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.Message],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
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
    const reply = await runAgent(msg.author.id, content);
    for (const part of chunk(reply)) {
      await msg.reply({ content: part, allowedMentions: { repliedUser: false } });
    }
  } catch (err) {
    console.error("agent error", err);
    await msg.reply("Maaf, ada error di sisi tutor. Coba lagi sebentar ya.");
  }
});

client.login(config.DISCORD_TOKEN);
