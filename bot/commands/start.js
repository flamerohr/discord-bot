const emojis = require('../config/emojis');

module.exports = async (client, message, { _, mayreel, sohee }) => {
  let emoji = '';

  if (mayreel)
    emoji = ` ${emojis.bouncy}`;
  else if (sohee)
    emoji = ` ${emojis.sohee}`;

  // just echo out what the message we had received
  const botMessage = await message.channel.send(`I start with${emoji}: ${_.join(' ')}`);
};
