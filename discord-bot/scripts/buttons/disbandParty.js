const { MessageEmbed } = require('discord.js');

const id = interaction => `disbandParty-${interaction.id}`;

const handler = async (context) => {
  let { slashCommandReplyMessage, buttonInteraction, partyState } = context;
  let { room } = partyState;
  partyState.disbanded = true;

  let messageEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Party Request')
    .setDescription(`The party has been disbanded by ${buttonInteraction.user.username} ... 🚮`);
  await slashCommandReplyMessage.edit({ embeds: [messageEmbed], components: [] })

  if (room && !room.deleted) {
    await room.delete();
  }

  if (!buttonInteraction.replied)
    await buttonInteraction.update({});
}

module.exports = {
  id,
  handler,
  filter: ({ slashCommandInteraction, componentInteraction }) => {
    if (componentInteraction.customId !== id(slashCommandInteraction))
      return false;
    return true;
  }
};