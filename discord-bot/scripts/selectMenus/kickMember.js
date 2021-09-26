const { buildMainEmbed } = require('../helpers')

const id = interaction => `kickMember-selectMenu-${interaction.id}`;

const handler = async (context) => {
  let { slashCommandReplyMessage, slashCommandInteraction, componentInteraction, buttonInteraction, partyState } = context;
  let { maximumMembers, members, room } = partyState;
  let isPartyMember = members.some(m => m.id === buttonInteraction.user.id)
  if (!isPartyMember) {
    await componentInteraction.reply({ content: `You can't kick if you're not part of the party!`, ephemeral: true });
    return;
  } else if (isPartyMember && members.length <= 1) {
    await componentInteraction.reply({ content: `You're the only member of the party. You can't kick yourself!`, ephemeral: true });
    return;
  }

  // const memberToKick = componentInteraction.options.get('maximum_members')?.value ?? defaultMaxMembersInParty;
  const userIdToKick = componentInteraction.values[0];
  const userToKick = members.find(m => m.id === userIdToKick);
  if (!userToKick) {
    await componentInteraction.reply({ content: `${userToKick} is no longer part of the party!`, ephemeral: true });
  }

  // Actually kick the user
  members.splice(members.findIndex(m => m.id === userIdToKick), 1);

  let messageEmbed = buildMainEmbed({ maximumMembers, members, interaction: slashCommandInteraction });
  await slashCommandReplyMessage.edit({ embeds: [messageEmbed] })

  if (room && !room.deleted) {
    await room.members.remove(buttonInteraction.user.id);
  }

  await componentInteraction.reply({ content: `${buttonInteraction.user} has kicked ${userToKick}!` });
}

module.exports = {
  id,
  handler,
  filter: ({ buttonInteraction, componentInteraction }) => {
    if (componentInteraction.customId !== id(buttonInteraction))
      return false;
    return true;
  }
};
