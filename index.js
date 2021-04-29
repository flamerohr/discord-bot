require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

const { prefix } = require('./config/bot');
const commands = require('./commands');

// tells us the bot has successfully logged in
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// react to messages received
client.on('message', (message) => {
  // ignore other bots
  if (message.author.bot) return;

  // ignore non-prefixed messages
  if (!message.content.startsWith(prefix)) return;

  commands(client, message);
});

client.login(process.env.DISCORD_BOT_TOKEN);
