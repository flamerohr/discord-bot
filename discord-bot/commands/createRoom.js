const { MessageActionRow, MessageButton } = require('discord.js');
const { buildMainEmbed } = require('../scripts/helpers')
const { minimumMembersInParty, defaultMaxMembersInParty } = require('../config.json');

const joinPartyButton = require('../scripts/buttons/joinParty');
const leavePartyButton = require('../scripts/buttons/leaveParty');
const createRoomButton = require('../scripts/buttons/createRoom');
const disbandPartyButton = require('../scripts/buttons/disbandParty');
const kickMemberButton = require('../scripts/buttons/kickMember');

module.exports = {
  name: 'create-room',
  description: 'Creates a room!',
  options: [{
    name: 'maximum_members',
    type: 'INTEGER',
    description: 'The maximum number of members for your party.' + (defaultMaxMembersInParty ? ` Default is ${defaultMaxMembersInParty}.` : '')
  }],
  executeAsync: async (interaction) => {
    if (interaction.channel.isThread()) {
      await interaction.reply({content: `You can't create a party inside a thread!`, ephemeral: true});
      return;
    }
    const maximumMembers = interaction.options.get('maximum_members')?.value ?? defaultMaxMembersInParty;
    if (maximumMembers && maximumMembers < minimumMembersInParty) {
      await interaction.reply({content: `Maximum party size must be ${minimumMembersInParty} or more!`, ephemeral: true});
      return;
    }

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId(joinPartyButton.id(interaction))
          .setLabel('🤼 Join Party')
          .setStyle('SUCCESS'),
        new MessageButton()
          .setCustomId(leavePartyButton.id(interaction))
          .setLabel('👋 Leave Party')
          .setStyle('SECONDARY'),
        new MessageButton()
          .setCustomId(createRoomButton.id(interaction))
          .setLabel('🛖 Create Room')
          .setStyle('PRIMARY'),
        new MessageButton()
          .setCustomId(disbandPartyButton.id(interaction))
          .setLabel('💔 Disband Party')
          .setStyle('DANGER'),
        new MessageButton()
          .setCustomId(kickMemberButton.id(interaction))
          .setLabel('🥾 Kick Member')
          .setStyle('DANGER'),
      );

    const messageEmbed = buildMainEmbed({ maximumMembers, members: [interaction.user], interaction });

    const interactionReplyMessage = await interaction.reply({
      embeds: [messageEmbed],
      components: [row],
      fetchReply: true
    });

    const partyState = {
      members: [interaction.user],
      room: null,
      maximumMembers,
      disbanded: false
    }

    const createFilterParams = componentInteraction => {
      return {
        slashCommandReplyMessage: interactionReplyMessage,
        slashCommandInteraction: interaction,
        componentInteraction,
        partyState
    }};

    // Filter, so it doesn't affect other non-related interactions or messages.
    const filter = componentInteraction =>
      joinPartyButton.filter(createFilterParams(componentInteraction))
      || leavePartyButton.filter(createFilterParams(componentInteraction))
      || createRoomButton.filter(createFilterParams(componentInteraction))
      || disbandPartyButton.filter(createFilterParams(componentInteraction))
      || kickMemberButton.filter(createFilterParams(componentInteraction));

    // Handle when the user clicks on the button.
    while(!partyState.disbanded) {
      try {
        const componentInteraction = await interactionReplyMessage.awaitMessageComponent({ filter, time: 900000 });
        const context = {
          slashCommandReplyMessage: interactionReplyMessage,
          slashCommandInteraction: interaction,
          buttonInteraction: componentInteraction,
          partyState
        };

        switch (componentInteraction.customId) {
          case leavePartyButton.id(interaction):
            await leavePartyButton.handler(context);
            break;
          case joinPartyButton.id(interaction):
            await joinPartyButton.handler(context);
            break;
          case createRoomButton.id(interaction):
            await createRoomButton.handler(context);
            break;
          case disbandPartyButton.id(interaction):
            await disbandPartyButton.handler(context);
            break;
          case kickMemberButton.id(interaction):
            await kickMemberButton.handler(context);
            break;
        }
      } catch (err) {
        // This means the button wasn't clicked on time
        if (err.code === 'INTERACTION_COLLECTOR_ERROR') {
          if (!interactionReplyMessage.deleted)
            await interactionReplyMessage.edit({
              content: 'There has been a long period of inactivity. The party request has expired.',
              components: []
            });
          break;
        } else {
          throw err;
        }
      }
    }
  }
}
