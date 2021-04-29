require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const { prefix } = require('./config/bot');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // ignore other bots
  if (message.author.bot) return;

  // ignore non-prefixed messages
  if (!message.content.startsWith(prefix)) return;

  if (message.content === `${prefix}ping`) {
    message.reply('pong');
  }
});

client.login(process.env.DISCOrD_BOT_TOKEN);
