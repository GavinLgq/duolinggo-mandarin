import { REST, Routes } from "discord.js";
import { commands } from "./commands.js";
import { config } from "./config.js";

const rest = new REST().setToken(config.DISCORD_TOKEN);

const data = (await rest.put(
  Routes.applicationCommands(config.DISCORD_CLIENT_ID),
  { body: commands },
)) as unknown[];

console.log(`Registered ${data.length} global slash commands.`);
