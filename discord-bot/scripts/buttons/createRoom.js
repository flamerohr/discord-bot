const { MessageEmbed } = require('discord.js');

const id = interaction => `createRoom-${interaction.id}`;

const buildRoomControlEmbed = () => {
  return new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Party Control')
    .setDescription('The party room has been created! Use this thread to share the room code & chat away!')
}

const sendRoomControlMessage = async ({ thread }) => {
  const roomControlEmbed = buildRoomControlEmbed()
  await thread.send({ embeds: [roomControlEmbed] })
}

const handler = async (context) => {
  let { slashCommandInteraction, buttonInteraction, partyState } = context;

  if (partyState.room) {
    await buttonInteraction.reply({content: `A room has already been created!`, ephemeral: true});
    return;
  }

  let thread = await buttonInteraction.channel.threads.create({
    name: `${slashCommandInteraction.user.username} Room`,
    autoArchiveDuration: 60,
    reason: `Room for ${slashCommandInteraction.user.username}'s party.'`,
  });

  await sendRoomControlMessage({ thread, ...context })

  let { members } = partyState;
  for (let i = 0; i < members.length; i++) {
    let member = members[i];
    await thread.members.add(member.id);
  }

  // Disable the createRoom button, now that room has been created
  let firstActionRow = buttonInteraction.message.components[0];
  let createRoomButton = firstActionRow.components.find(x => x.customId === id(slashCommandInteraction))
  createRoomButton.setDisabled(true);

  // This handler can be called from other button handlers which
  // may already replied to the interaction.
  // Thus, we put conditional checks here.
  if (!buttonInteraction.replied)
    await buttonInteraction.update({ components: [firstActionRow] });
  else
    await buttonInteraction.message.edit({ components: [firstActionRow] });

  partyState.room = thread;
}

module.exports = {
  id,
  handler,
  filter: ({ slashCommandInteraction, componentInteraction, partyState: { members } }) => {
    if (componentInteraction.customId !== id(slashCommandInteraction))
      return false;

    // Checks if the user who clicked the button
    // is a party member.
    if (!members.find(m => m.id === componentInteraction.user.id)) {
      componentInteraction.reply({ 
        content: `Only the party members can create the room!`,
        ephemeral: true
      });
      return false;
    }
    return true;
  }
};