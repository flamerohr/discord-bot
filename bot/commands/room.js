module.exports = async (client, message, { }) => {
  const key = Math.random().toString(36).replace('0.', '').substr(0, 5);
  const roomUrl = process.env.CHATROOM_URL.replace('{room}', `gt-coop-${key}`);

  message.channel.send(`Your channel for co-op is here: ${roomUrl}`);
};
