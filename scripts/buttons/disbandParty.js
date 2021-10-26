const { MessageEmbed } = require('discord.js');

const id = interaction => `disbandParty-${interaction.id}`;

const handler = async (context) => {
  let { slashCommandReplyMessage, buttonInteraction, partyState } = context;
  let { room, members } = partyState;

  let isPartyMember = members.some(m => m.id === buttonInteraction.user.id)
  if (!isPartyMember) {
    await buttonInteraction.reply({ content: `You can't disband if you're not part of the party!`, ephemeral: true });
    return;
  }

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
