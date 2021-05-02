// reference chat link: https://meet.jit.si/HelloMSSNES

module.exports = async (client, message, { }) => {
  const key = Math.random().toString(36).replace('0.', '').substr(0, 5);

  message.channel.send(`Your channel for co-op is here: https://meet.jit.si/gt-coop-${key}`);
};
