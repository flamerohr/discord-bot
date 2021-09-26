const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { buildMainEmbed } = require('../helpers')
const kickMemberSelectMenu = require('../selectMenus/kickMember')

const id = interaction => `kickMember-${interaction.id}`;

const buildKickEmbed = () => {
  return new MessageEmbed()
    .setColor('#e10000')
    .setTitle('Select Victim')
    .setDescription('Who must you kick?')
}

const buildKickActionRow = (buttonInteraction, members) => {
  return new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
        .setCustomId(kickMemberSelectMenu.id(buttonInteraction))
        .setPlaceholder('Select a party member')
        .addOptions(members.map((member) => {
          return {
            label: member.username,
            value: member.id,
          };
        })),
    );
}

const handler = async (context) => {
  let { buttonInteraction, partyState } = context;
  let { members } = partyState;
  let isPartyMember = members.some(m => m.id === buttonInteraction.user.id)
  if (!isPartyMember) {
    await buttonInteraction.reply({ content: `You can't kick if you're not part of the party!`, ephemeral: true });
    return;
  } else if (isPartyMember && members.length <= 1) {
    await buttonInteraction.reply({ content: `You're the only member of the party. You can't kick yourself!`, ephemeral: true });
    return;
  }

  const kickEmbed = buildKickEmbed();
  const kickActionRow = buildKickActionRow(buttonInteraction, members);
  await buttonInteraction.reply({
    embeds: [kickEmbed],
    components: [kickActionRow],
    ephemeral: true
  })

  // Filter, so it doesn't affect other non-related interactions or messages.
  const filter = componentInteraction =>
    kickMemberSelectMenu.filter({ ...context, componentInteraction });

  // Handle when the user clicks on the button.
  try {
    const componentInteraction = await buttonInteraction.channel.awaitMessageComponent({ filter, time: 60000 });

    switch (componentInteraction.customId) {
      case kickMemberSelectMenu.id(buttonInteraction):
        await kickMemberSelectMenu.handler({ ...context, componentInteraction });
        break;
    }
  } catch (err) {
    // This means the button wasn't clicked on time
    if (err.code === 'INTERACTION_COLLECTOR_ERROR') {
      await buttonInteraction.followUp({
        content: 'There has been a long period of inactivity. The kick request has expired.'
      });
    } else {
      throw err;
    }
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
