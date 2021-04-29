require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

const { prefix } = require('./config/bot');
const commands = require('./commands');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // ignore other bots
  if (message.author.bot) return;

  // ignore non-prefixed messages
  if (!message.content.startsWith(prefix)) return;

  commands(client, message);
});

client.login(process.env.DISCOrD_BOT_TOKEN);
