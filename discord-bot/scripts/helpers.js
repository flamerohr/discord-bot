const { MessageEmbed } = require('discord.js');

const buildMemberListString = (members) => {
  let message = `**Party members:**`;
  if (members.length) {
    members.forEach((member, index) => {
        message += `\n${index + 1}. ${member.username}`;
    })
  } else {
    message += '\nThere\'s no party members... 🦗'
  }
  return message;
}

const buildMainEmbed = ({ maximumMembers, members, interaction }) => {
  let content = `${interaction.user} needs party members! Please click \`Join Party\`!`;
  content += `\n\nOnce we reached the max party size, a room will be automatically created and we'll ping you!`;
  content += ` Alternatively, click on the \`Create Room\` button to start a room with your current members.`;
  if (maximumMembers)
    content += `\n\n**Maximum party size:**\n${maximumMembers}`;
  content = `${content}\n\n${buildMemberListString(members)}`

  return new MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Party Request')
    .setDescription(content)
}

module.exports = {
  buildMemberListString,
  buildMainEmbed
}