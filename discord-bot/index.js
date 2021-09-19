const path = require('path')

// Load values from `.env` file.
//
// Note the path is provided explicitly, so it doesn't try to find
// the `.env` file from the executing directory, which can be
// different from the project directory
require('dotenv').config({ path: path.join(__dirname, '/.env') });

const { Client, Intents } = require('discord.js');
const { handleCommandAsync, commands } = require('./commands/index')

// For list of available intents, see:
//   https://discord.com/developers/docs/topics/gateway#list-of-intents
const botIntents = new Intents([Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]); // To listen to guild message events
const client = new Client({ intents: botIntents });

async function setSlashCommandsAsync(guildId) {
  const data = [];
  for (commandName in commands) {
    let command = commands[commandName];
    let slashCommand = {
      name: command.name,
      description: command.description,
      options: command.options
    }
    data.push(slashCommand);
  }

  const guild = client.guilds.cache.get(guildId);
  const command = await guild?.commands.set(data);
  console.log(`Set the commands for the guild '${guild.name}'. Id: ${guild.id}`)
  console.log(command);
}

client.on('ready', async () => {
  // Set the slash commands on a per-guild basis so it takes immediate effect.
  // Alternatively, if you have many guilds using your bot, you can look into
  // using global level slash commands instead of guild level slash commands.
  // They have up to a 1 hour delay to propagate to all the guilds, however.
  let guildCollection = await client.guilds.fetch();
  let guilds = Array.from(guildCollection.values());
  for (let i = 0; i < guilds.length; i++) {
    let guild = guilds[i];
    await setSlashCommandsAsync(guild.id);
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  await handleCommandAsync(interaction);
});

client.login(process.env.DISCORD_BOT_TOKEN);