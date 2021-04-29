module.exports = (client, message, { _ }) => {
  // just echo out what the message we had received
  message.channel.send(`I got: ${_.join(' ')}`);
};
