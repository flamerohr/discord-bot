const { buildMainEmbed } = require('../helpers')

const id = interaction => `leaveParty-${interaction.id}`;

const handler = async (context) => {
  let { slashCommandInteraction, slashCommandReplyMessage, buttonInteraction, partyState: { maximumMembers, members, room } } = context;
  let alreadyJoined = members.some(m => m.id === buttonInteraction.user.id)
  if (!alreadyJoined) {
    // This handler can be called from other button handlers which
    // may already replied to the interaction.
    // Thus, we put conditional checks here.
    if (!buttonInteraction.replied)
      await buttonInteraction.reply({ content: `You can't leave. You're not part of the party!`, ephemeral: true });
    else
      await buttonInteraction.channel.send({ content: `You can't leave. You're not part of the party!`, ephemeral: true });
    return;
  }

  members.splice(members.findIndex(m => m.id === buttonInteraction.user.id), 1);

  let messageEmbed = buildMainEmbed({ maximumMembers, members, interaction: slashCommandInteraction });
  await slashCommandReplyMessage.edit({ embeds: [messageEmbed] })
  
  if (!buttonInteraction.replied)
    await buttonInteraction.update({});

  if (room && !room.deleted) {
    await room.members.remove(buttonInteraction.user.id);
  }
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