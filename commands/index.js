const fs = require('fs');

const commands = {};
const commandFiles = fs.readdirSync(__dirname).filter(file => 
  file.endsWith('.js') && !file.endsWith('index.js'));
for (const file of commandFiles) {
  const command = require(`./${file}`);
  commands[command.name] = command;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const handleErrorReply = async (interaction, errorMsg) => {
  let errorMessage = `An error occurred fulfilling your command: \`${errorMsg}\`.`;

  try {
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(errorMessage)
      if (!interaction.ephemeral) {
        await sleep(2000)
        interaction.editReply(`${errorMessage}\n**Deleting in 5...**`)
        await sleep(1000)
        interaction.editReply(`${errorMessage}\n**Deleting in 4...**`)
        await sleep(1000)
        interaction.editReply(`${errorMessage}\n**Deleting in 3...**`)
        await sleep(1000)
        interaction.editReply(`${errorMessage}\n**Deleting in 2...**`)
        await sleep(1000)
        interaction.editReply(`${errorMessage}\n**Deleting in 1...**`)
        await sleep(1000)
        await interaction.deleteReply();
      }
    } else {
      await interaction.reply({ content: errorMessage, ephemeral: true })
    }
  } catch {}
};

const handleCommandAsync = async (interaction) => {
  // check if command exists
  const command = commands[interaction.commandName];
  if (!command) return;

  // call the command
  try {
    await command.executeAsync(interaction);
  } catch (err) {
    // something wrong, this stops the command crashing the app
    console.error(`Error handling the command '${command.name}'`);
    console.error(err);
    handleErrorReply(interaction, err.message);
  }
};

module.exports = { handleCommandAsync, commands };
