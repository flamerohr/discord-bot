const { buildMainEmbed } = require('../helpers')
const { handler: createRoomHandler } = require('./createRoom');

const id = interaction => `joinParty-${interaction.id}`;

const handler = async (context) => {
  let { slashCommandInteraction, slashCommandReplyMessage, buttonInteraction, partyState } = context;
  let { maximumMembers, members, room } = partyState;
  let alreadyJoined = members.some(m => m.id === buttonInteraction.user.id)
  if (alreadyJoined) {
    await buttonInteraction.reply({content: `You've already joined the party!`, ephemeral: true});
    return;
  }

  if (maximumMembers && members.length >= maximumMembers) {
    await buttonInteraction.reply({content: `The party is full!`, ephemeral: true});
    return;
  }

  members.push(buttonInteraction.user);

  let messageEmbed = buildMainEmbed({ maximumMembers, members, interaction: slashCommandInteraction });
  await slashCommandReplyMessage.edit({ embeds: [messageEmbed] })
  
  if (!buttonInteraction.replied)
    await buttonInteraction.update({});

  if (room && !room.deleted) {
    await room.members.add(buttonInteraction.user.id);
  }

  // If reached maximum number of members, we automatically
  // create the room
  if (maximumMembers && members.length == maximumMembers && !room) {
    createRoomHandler(context)
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