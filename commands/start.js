const emojis = require('../config/emojis');

module.exports = async (client, message, { _, mayreel }) => {
  const emoji = mayreel ? ` ${emojis.bouncy}` : '';

  // just echo out what the message we had received
  const botMessage = await message.channel.send(`I start with${emoji}: ${_.join(' ')}`);
};
