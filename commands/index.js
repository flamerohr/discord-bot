const { prefix } = require('../config/bot');
const start = require('./start');

const parseCommand = (client, message) => {
  const body = message.content.slice(prefix.length);
  const params = body.split(' ');
  const command = params.shift().toLowerCase();

  console.log(command, params);
  switch (command) {
    case 'start': {
      start(client, message, ...params);
      break;
    }
    case 'ping': {
      message.channel.send('pong');
      break;
    }
    default: {
      message.channel.send('Help stuff here');
    }
  }
};

module.exports = parseCommand;
